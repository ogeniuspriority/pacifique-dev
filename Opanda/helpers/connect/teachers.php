<?php
require_once('../../helpers/functions.php');
class ConnectTeacher extends DB
{
    function getSubjects($mysqli)
    {
        $get_subjects_sql = 'SELECT DISTINCT subject FROM coursestructure';
        $subjects = $mysqli->query($get_subjects_sql);
        $options = '';
        while ($row_unit = mysqli_fetch_array($subjects)) {
            $options .= "<option value='$row_unit[0]'>$row_unit[0]</option>";
        }
        echo $options;
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
    function getUniqueViews($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $selected_subject = strip_tags(trim(htmlspecialchars($_POST['subject'])));
            $selected_level = strip_tags(trim(htmlspecialchars($_POST['level'])));
            $date = strip_tags(trim(htmlspecialchars($_POST['date'])));
            $activity_id = strip_tags(trim(htmlspecialchars($_POST['activity'])));
            $teacher_id = strip_tags(trim(htmlspecialchars($_POST['teacherId'])));
            $selected_units = isset($_POST['units']) ? $_POST['units'] : [];
            $unique_students = 0;
            $unique_teachers = 0;
            $get_unique_views_query = 'SELECT COUNT(DISTINCT unique_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id = ? AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id = ?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS unique_views';
            $fun = new Functions();
            $min_date = $fun->checkDate($date)[0];
            $max_date = $fun->checkDate($date)[1];
            if (count($selected_units) === 0) {
                $activity_item = $selected_subject . '_' . $selected_level . '_' . '';
                $unique_students += $fun->getViews($mysqli, $get_unique_views_query, $activity_item, $min_date, $max_date, $activity_id, 'student');
                $unique_students += $fun->getViewsById($mysqli, $selected_subject, $selected_level, '', $teacher_id, $min_date, $max_date, $activity_id, 'student');
                $unique_teachers += $fun->getViews($mysqli, $get_unique_views_query, $activity_item, $min_date, $max_date, $activity_id, 'teacher');
                $unique_students += $fun->getViewsById($mysqli, $selected_subject, $selected_level, '', $teacher_id, $min_date, $max_date, $activity_id, 'teacher');
            } else {
                foreach ($selected_units as $unit) {
                    $unit = strip_tags(trim(htmlspecialchars($unit)));
                    $activity_item = $selected_subject . '_' . $selected_level . '_' . $unit;
                    $unique_students += $fun->getViews($mysqli, $get_unique_views_query, $activity_item, $min_date, $max_date, $activity_id, 'student');
                    $unique_students += $fun->getViewsById($mysqli, $selected_subject, $selected_level, $unit, $teacher_id, $min_date, $max_date, $activity_id, 'student');
                    $unique_teachers += $fun->getViews($mysqli, $get_unique_views_query, $activity_item, $min_date, $max_date, $activity_id, 'teacher');
                    $unique_students += $fun->getViewsById($mysqli, $selected_subject, $selected_level, $unit, $teacher_id, $min_date, $max_date, $activity_id, 'teacher');
                }
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
            $teacher_id = strip_tags(trim(htmlspecialchars($_POST['teacherId'])));
            $selected_units = isset($_POST['units']) ? $_POST['units'] : [];
            $all_students = 0;
            $all_teachers = 0;
            $get_all_views_query = 'SELECT COUNT(all_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id = ?  AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id = ?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS all_views';
            $fun = new Functions();
            $min_date = $fun->checkDate($date)[0];
            $max_date = $fun->checkDate($date)[1];
            if (count($selected_units) === 0) {
                $activity_item = $selected_subject . '_' . $selected_level . '_' . '';
                $all_students += $fun->getViews($mysqli, $get_all_views_query, $activity_item, $min_date, $max_date, $activity_id, 'student');
                $all_students += $fun->getAllViewsById($mysqli, $selected_subject, $selected_level, '', $teacher_id, $min_date, $max_date, $activity_id, 'student');
                $all_teachers += $fun->getViews($mysqli, $get_all_views_query, $activity_item, $min_date, $max_date, $activity_id, 'teacher');
                $all_students += $fun->getAllViewsById($mysqli, $selected_subject, $selected_level, '', $teacher_id, $min_date, $max_date, $activity_id, 'teacher');
            }
            foreach ($selected_units as $unit) {
                $unit = strip_tags(trim(htmlspecialchars($unit)));
                $activity_item = $selected_subject . '_' . $selected_level . '_' . $unit;
                $all_students += $fun->getViews($mysqli, $get_all_views_query, $activity_item, $min_date, $max_date, $activity_id, 'student');
                $all_students += $fun->getAllViewsById($mysqli, $selected_subject, $selected_level, $unit, $teacher_id, $min_date, $max_date, $activity_id, 'student');
                $all_teachers += $fun->getViews($mysqli, $get_all_views_query, $activity_item, $min_date, $max_date, $activity_id, 'teacher');
                $all_students += $fun->getAllViewsById($mysqli, $selected_subject, $selected_level, $unit, $teacher_id, $min_date, $max_date, $activity_id, 'teacher');
            }
            echo $all_students . ',' . $all_teachers;
        }
    }
}
