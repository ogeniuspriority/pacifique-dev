<?php
require_once('../helpers/db.php');
require_once('../helpers/functions.php');
class Connect extends DB
{
    function getSubjects()
    {
        $get_subjects_sql = 'SELECT DISTINCT subject FROM coursestructure';
        $subjects = $this->mysqli->query($get_subjects_sql);
        return $subjects;
    }
    function getChildren($identifier, $user_type)
    {
        $identifier = strip_tags(trim(htmlspecialchars($identifier)));
        $user_type = strip_tags(trim(htmlspecialchars($user_type)));
        $get_children_sql = 'SELECT * FROM users WHERE guardian_tel=? AND user_type=?';
        $get_children_statement = $this->mysqli->prepare($get_children_sql);
        $get_children_statement->bind_param('ss', $identifier, $user_type);
        $get_children_statement->execute();
        $children = $get_children_statement->get_result();
        return $children;
    }
    function getUnits($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $selected_subject = strip_tags(trim(htmlspecialchars($_POST['subject'])));
            $selected_level = strip_tags(trim(htmlspecialchars($_POST['level'])));
            $get_subjects_sql2 = 'SELECT units FROM coursestructure WHERE subject=? AND level=?';
            $statement = $mysqli->prepare($get_subjects_sql2);
            $statement->bind_param('ss', $selected_subject, $selected_level);
            $statement->execute();
            $units = $statement->get_result();
            $options = '';
            while ($row_unit = mysqli_fetch_array($units)) {
                $options .= "<option value='$row_unit[0]'>$row_unit[0]</option>";
            }
            echo $options;
        }
    }
    function getChildrenStatistics($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $user_id = strip_tags(trim(htmlspecialchars($_POST['id'])));
            $page = strip_tags(trim(htmlspecialchars($_POST['page'])));
            $date = strip_tags(trim(htmlspecialchars($_POST['date'])));
            $activity = strip_tags(trim(htmlspecialchars($_POST['activity'])));
            $limit = 2;
            $start = ($page - 1) * $limit;
            $fun = new Functions();
            $min_date = $fun->checkDate($date)[0];
            $max_date = $fun->checkDate($date)[1];
            $get_child_stats_sql_total = 'SELECT CASE WHEN live_visibility_activity_id = 1 THEN "forum" WHEN live_visibility_activity_id = 2 THEN "courses" WHEN live_visibility_activity_id = 3 THEN "simulations" WHEN live_visibility_activity_id = 4 THEN "library" WHEN live_visibility_activity_id = 5 THEN "feedback" WHEN live_visibility_activity_id = 6 THEN "notifications" WHEN live_visibility_activity_id = 7 THEN "settings" WHEN live_visibility_activity_id = 8 THEN "help" WHEN live_visibility_activity_id = 9 THEN "renewpayment" WHEN live_visibility_activity_id = 10 THEN "onlineclasses" WHEN live_visibility_activity_id = 11 THEN "generaltests" ELSE "Untracked" END AS activity, TIMESTAMPDIFF( SECOND, MIN(live_visibility_regdate), MAX(live_visibility_regdate)) AS span, MIN(live_visibility_regdate) as start, MAX(live_visibility_regdate) as end FROM live_visibility WHERE live_visibility_id_user=? AND live_visibility_regdate > ? AND live_visibility_regdate < ? AND live_visibility_activity_id = ? GROUP BY single_session_identifier';
            $statement_total = $mysqli->prepare($get_child_stats_sql_total);
            $statement_total->bind_param('ssss', $user_id, $min_date, $max_date, $activity);
            $statement_total->execute();
            $stats_total = $statement_total->get_result();
            $get_child_stats_sql = 'SELECT CASE WHEN live_visibility_activity_id = 1 THEN "forum" WHEN live_visibility_activity_id = 2 THEN "courses" WHEN live_visibility_activity_id = 3 THEN "simulations" WHEN live_visibility_activity_id = 4 THEN "library" WHEN live_visibility_activity_id = 5 THEN "feedback" WHEN live_visibility_activity_id = 6 THEN "notifications" WHEN live_visibility_activity_id = 7 THEN "settings" WHEN live_visibility_activity_id = 8 THEN "help" WHEN live_visibility_activity_id = 9 THEN "renewpayment" WHEN live_visibility_activity_id = 10 THEN "onlineclasses" WHEN live_visibility_activity_id = 11 THEN "generaltests" ELSE "Untracked" END AS activity, TIMESTAMPDIFF( SECOND, MIN(live_visibility_regdate), MAX(live_visibility_regdate)) AS span, MIN(live_visibility_regdate) as start, MAX(live_visibility_regdate) as end, live_visibility_id FROM live_visibility WHERE live_visibility_id_user=? AND live_visibility_regdate > ? AND live_visibility_regdate < ? AND live_visibility_activity_id = ? GROUP BY single_session_identifier LIMIT ? , ?';
            $statement = $mysqli->prepare($get_child_stats_sql);
            $statement->bind_param('ssssss', $user_id, $min_date, $max_date, $activity, $start, $limit);
            $statement->execute();
            $stats = $statement->get_result();
            $content = '';
            if ($stats->num_rows !== 0) {
                $fun = new Functions();
                while ($row_stats = mysqli_fetch_array($stats)) {
                    $time_spent = '' . $fun->convertSecToTime($row_stats[1]);
                    if ($row_stats[0] === 'generaltests') {
                        $content .= "<div id='content_container' class='content_container rounded p-2 m-1'><div class='d-flex justify-content-around'><p>Session Starting time: </p><p>$row_stats[2]</p></div><div class='d-flex justify-content-around'><p>Session ending time: </p><p>$row_stats[3]</p></div><div class='d-flex justify-content-around'><p>Time spent: </p><p>$time_spent</p></div><div class='d-flex justify-content-around'><p>Marks: </p><p>Coming soon...</p></div></div>";
                    } else {
                        $content .= "<div id='content_container' class='content_container rounded p-2 m-1'><div class='d-flex justify-content-around'><p>Session starting time: </p><p>$row_stats[2]</p></div><div class='d-flex justify-content-around'><p>Session ending time: </p><p>$row_stats[3]</p></div><div class='d-flex justify-content-around'><p>Time spent: </p><p>$time_spent</p></div></div>";
                    }
                }
            } else {
                $content .= "<div id='content_container' class='content_container rounded p-2'><div class='d-flex justify-content-around'><p>No activity for the selected time</p></div></div>";
            }
            $content .= "_&_&" . $stats_total->num_rows;
            echo $content;
        }
    }
    function getUniqueViews($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $selected_subject = strip_tags(trim(htmlspecialchars($_POST['subject'])));
            $selected_level = strip_tags(trim(htmlspecialchars($_POST['level'])));
            $date = strip_tags(trim(htmlspecialchars($_POST['date'])));
            $activity_id = strip_tags(trim(htmlspecialchars($_POST['activity'])));
            $selected_units = isset($_POST['units']) ? $_POST['units'] : [];
            $unique_students = 0;
            $unique_teachers = 0;
            $get_unique_views_query = 'SELECT COUNT(DISTINCT unique_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id = ?  AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id = ?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS unique_views';
            $fun = new Functions();
            $min_date = $fun->checkDate($date)[0];
            $max_date = $fun->checkDate($date)[1];
            foreach ($selected_units as $unit) {
                $unit = strip_tags(trim(htmlspecialchars($unit)));
                $activity_item = $selected_subject . '_' . $selected_level . '_' . $unit;
                $unique_students += $fun->getViews($mysqli, $get_unique_views_query, $activity_item, $min_date, $max_date, $activity_id, 'student');
                $unique_teachers += $fun->getViews($mysqli, $get_unique_views_query, $activity_item, $min_date, $max_date, $activity_id, 'teacher');
            }
            echo $unique_students . ',' . $unique_teachers;
        }
    }
    function getAllViews($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $selected_subject = strip_tags(trim(htmlspecialchars($_POST['subject'])));
            $selected_level = strip_tags(trim(htmlspecialchars($_POST['level'])));
            $date = strip_tags(trim(htmlspecialchars($_POST['date'])));
            $activity_id = strip_tags(trim(htmlspecialchars($_POST['activity'])));
            $selected_units = isset($_POST['units']) ? $_POST['units'] : [];
            $all_students = 0;
            $all_teachers = 0;
            $get_all_views_query = 'SELECT COUNT(all_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id = ?  AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id = ?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS all_views';
            $fun = new Functions();
            $min_date = $fun->checkDate($date)[0];
            $max_date = $fun->checkDate($date)[1];
            foreach ($selected_units as $unit) {
                $unit = strip_tags(trim(htmlspecialchars($unit)));
                $activity_item = $selected_subject . '_' . $selected_level . '_' . $unit;
                $all_students += $fun->getViews($mysqli, $get_all_views_query, $activity_item, $min_date, $max_date, $activity_id, 'student');
                $all_teachers += $fun->getViews($mysqli, $get_all_views_query, $activity_item, $min_date, $max_date, $activity_id, 'teacher');
            }
            echo $all_students . ',' . $all_teachers;
        }
    }
    function drawChart($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $user_id = strip_tags(trim(htmlspecialchars($_POST['id'])));
            $date = strip_tags(trim(htmlspecialchars($_POST['date'])));
            $activity = strip_tags(trim(htmlspecialchars($_POST['activity'])));
            $fun = new Functions();
            $min_date = $fun->checkDate($date)[0];
            $max_date = $fun->checkDate($date)[1];
            $draw_child_stats_chart_sql = 'SELECT TIMESTAMPDIFF( SECOND, MIN(live_visibility_regdate), MAX(live_visibility_regdate)) AS span, MAX(live_visibility_regdate) as time FROM live_visibility WHERE live_visibility_id_user=? AND live_visibility_regdate > ? AND live_visibility_regdate < ? AND live_visibility_activity_id = ? GROUP BY single_session_identifier';
            $statement = $mysqli->prepare($draw_child_stats_chart_sql);
            $statement->bind_param('ssss', $user_id, $min_date, $max_date, $activity);
            $statement->execute();
            $stats = $statement->get_result();
            while ($row_stats = mysqli_fetch_array($stats)) {
                $span = intval($row_stats[0] / 60);
                $span = $span . '.' . str_pad(($row_stats[0] % 60), 2, '0', STR_PAD_LEFT);
                $time = strtotime($row_stats[1]);
                $output[] = array(
                    'span' => $span,
                    'time' => date('d/m/Y', $time)
                );
            }
            echo json_encode($output);
        }
    }
}
