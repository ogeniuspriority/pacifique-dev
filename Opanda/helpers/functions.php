<?php
class Functions
{
    function convertSecToTime($sec = 0)
    {
        if ($sec == 0) {
            return '0 seconds';
        }
        $date1 = new DateTime("@0");
        $date2 = new DateTime("@$sec");
        $interval = date_diff($date1, $date2);
        $parts = ['years' => 'y', 'months' => 'm', 'days' => 'd', 'hours' => 'h', 'minutes' => 'i', 'seconds' => 's'];
        $formatted = [];
        foreach ($parts as $i => $part) {
            $value = $interval->$part;
            if ($value !== 0) {
                if ($value == 1) {
                    $i = substr($i, 0, -1);
                }
                $formatted[] = "$value $i";
            }
        }

        if (count($formatted) == 1) {
            return $formatted[0];
        } else {
            $str = implode(', ', array_slice($formatted, 0, -1));
            $str .= ' and ' . $formatted[count($formatted) - 1];
            return $str;
        }
    }
    function checkDate($date)
    {
        $min_date = date("Y-m-d") . ' 00:00:00';
        $max_date = date("Y-m-d") . ' 23:59:59';
        switch ($date) {
            case 1:
                $min_date = '2019-01-01 00:00:00';
                $max_date = date("Y-m-d") . ' 23:59:59';
                break;
            case 2:
                $start_year = strtotime("first day of January");
                $end_year = strtotime("last day of December");
                $min_date = date("Y-m-d", $start_year) . ' 00:00:00';
                $max_date = date("Y-m-d", $end_year) . ' 23:59:59';
                break;
            case 3:
                $start_mount = strtotime("first day of this month");
                $end_mount = strtotime("last day of this month");
                $min_date = date("Y-m-d", $start_mount) . ' 00:00:00';
                $max_date = date("Y-m-d", $end_mount) . ' 23:59:59';
                break;
            case 4:
                $start_week = strtotime("last sunday midnight");
                $end_week = strtotime("next saturday");
                $min_date = date("Y-m-d", $start_week) . ' 00:00:00';
                $max_date = date("Y-m-d", $end_week) . ' 23:59:59';
                break;
            case 5:
                $min_date = date("Y-m-d", time() - 86400) . ' 00:00:00';
                $max_date = date("Y-m-d", time() - 86400) . ' 23:59:59';
                break;
            case 6:
                $min_date = date("Y-m-d") . ' 00:00:00';
                $max_date = date("Y-m-d") . ' 23:59:59';
                break;
            default:
                $min_date = $date . ' 00:00:00';
                $max_date = $date . ' 23:59:59';
        }
        return [$min_date, $max_date];
    }
    function getViews($mysqli, $get_unique_views_query, $activity_item, $min_date, $max_date, $activity_id, $user_type)
    {
        $statement = $mysqli->prepare($get_unique_views_query);
        $statement->bind_param('sssss', $activity_item, $min_date, $max_date, $activity_id, $user_type);
        $statement->execute();
        $unique_views_result = $statement->get_result();
        return mysqli_fetch_array($unique_views_result)[0];
    }
    function getViewsById($mysqli, $subject, $level, $unit, $teacher_id, $min_date, $max_date, $activity_id, $user_type)
    {
        $get_unique_views_query = '';
        switch ($activity_id) {
            case 2:
                $get_unique_views_query = 'SELECT COUNT(DISTINCT unique_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id IN (SELECT classes.id FROM classes WHERE classes.subject = ? AND classes.level = ? AND classes.units = ? AND classes.creator_id = ?) AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id = ?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS unique_views';
                break;
            case 10:
                $get_unique_views_query = 'SELECT COUNT(DISTINCT unique_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id IN (SELECT onlineclass.id FROM onlineclass WHERE onlineclass.unit_id = (SELECT coursestructure.id FROM coursestructure WHERE coursestructure.subject =  ? AND coursestructure.level = ? AND coursestructure.units = ?) AND onlineclass.creator_id = ?) AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id = ?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS unique_views';
                break;
            case 12:
                $get_unique_views_query = 'SELECT COUNT(DISTINCT unique_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id IN (SELECT panda_test_map_2020_03.panda_test_map_2020_03_test_id FROM panda_test_map_2020_03 WHERE panda_test_map_2020_03.panda_test_map_2020_03_subject = ? AND panda_test_map_2020_03.panda_test_map_2020_03_academic_level = ? AND panda_test_map_2020_03.panda_test_map_2020_03_unit = ? AND panda_test_map_2020_03.panda_test_map_2020_03_creator = ?) AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id =?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS unique_views';
                break;
            case 4:
                $get_unique_views_query = 'SELECT COUNT(DISTINCT unique_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id IN (SELECT panda_books.panda_books_id FROM panda_books WHERE panda_books.panda_books_subject LIKE ? AND panda_books.panda_books_level = ? AND panda_books.panda_books_book_type = 1 AND panda_books.panda_books_id_user = ?) AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id = ?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS unique_views';
                break;
            case 14:
                $get_unique_views_query = 'SELECT COUNT(DISTINCT unique_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id IN (SELECT panda_books.panda_books_id FROM panda_books WHERE panda_books.panda_books_subject LIKE ? AND panda_books.panda_books_level = ? AND panda_books.panda_books_book_type = 0 AND panda_books.panda_books_id_user = ?) AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id = ?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS unique_views';
                break;
            default:
                $get_unique_views_query = 'SELECT COUNT(DISTINCT unique_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id IN (SELECT classes.id FROM classes WHERE classes.subject = ? AND classes.level = ? AND classes.units = ?) AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id = ?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS unique_views';
                break;
        }
        $statement = $mysqli->prepare($get_unique_views_query);
        if ($activity_id == 4 || $activity_id == 14) {
            $activity_id = '4';
            $subject = '%' . $subject . '%';
            $statement->bind_param('sssssss', $subject, $level, $teacher_id, $min_date, $max_date, $activity_id, $user_type);
        } else {
            $statement->bind_param('ssssssss', $subject, $level, $unit, $teacher_id, $min_date, $max_date, $activity_id, $user_type);
        }
        $statement->execute();
        $unique_views_result = $statement->get_result();
        return mysqli_fetch_array($unique_views_result)[0];
    }
    function getAllViewsById($mysqli, $subject, $level, $unit, $teacher_id, $min_date, $max_date, $activity_id, $user_type)
    {
        $get_all_views_query = '';
        switch ($activity_id) {
            case 2:
                $get_all_views_query = 'SELECT COUNT(unique_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id IN (SELECT classes.id FROM classes WHERE classes.subject = ? AND classes.level = ? AND classes.units = ? AND classes.creator_id = ?) AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id = ?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS unique_views';
                break;
            case 10:
                $get_all_views_query = 'SELECT COUNT(unique_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id IN (SELECT onlineclass.id FROM onlineclass WHERE onlineclass.unit_id = (SELECT coursestructure.id FROM coursestructure WHERE coursestructure.subject =  ? AND coursestructure.level = ? AND coursestructure.units = ?) AND onlineclass.creator_id = ?) AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id = ?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS unique_views';
                break;
            case 12:
                $get_all_views_query = 'SELECT COUNT(unique_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id IN (SELECT panda_test_map_2020_03.panda_test_map_2020_03_test_id FROM panda_test_map_2020_03 WHERE panda_test_map_2020_03.panda_test_map_2020_03_subject = ? AND panda_test_map_2020_03.panda_test_map_2020_03_academic_level = ? AND panda_test_map_2020_03.panda_test_map_2020_03_unit = ? AND panda_test_map_2020_03.panda_test_map_2020_03_creator = ?) AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id =?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS unique_views';
                break;
            case 4:
                $get_all_views_query = 'SELECT COUNT(unique_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id IN (SELECT panda_books.panda_books_id FROM panda_books WHERE panda_books.panda_books_subject LIKE ? AND panda_books.panda_books_level = ? AND panda_books.panda_books_book_type = 1 AND panda_books.panda_books_id_user = ?) AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id = ?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS unique_views';
                break;
            case 14:
                $get_all_views_query = 'SELECT COUNT(unique_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id IN (SELECT panda_books.panda_books_id FROM panda_books WHERE panda_books.panda_books_subject LIKE ? AND panda_books.panda_books_level = ? AND panda_books.panda_books_book_type = 0 AND panda_books.panda_books_id_user = ?) AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id = ?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS unique_views';
                break;
            default:
                $get_all_views_query = 'SELECT COUNT(unique_views.id) FROM (SELECT users.id FROM live_visibility  INNER JOIN users  ON live_visibility.live_visibility_id_user = users.id  WHERE live_visibility.live_visibility_activity_item_id IN (SELECT classes.id FROM classes WHERE classes.subject = ? AND classes.level = ? AND classes.units = ?) AND live_visibility.live_visibility_regdate > ?  AND live_visibility.live_visibility_regdate < ?  AND live_visibility.live_visibility_activity_id = ?  AND users.user_type = ?  GROUP BY live_visibility.single_session_identifier) AS unique_views';
                break;
        }
        $statement = $mysqli->prepare($get_all_views_query);
        if ($activity_id == 4 || $activity_id == 14) {
            $activity_id = '4';
            $subject = '%' . $subject . '%';
            $statement->bind_param('sssssss', $subject, $level, $teacher_id, $min_date, $max_date, $activity_id, $user_type);
        } else {
            $statement->bind_param('ssssssss', $subject, $level, $unit, $teacher_id, $min_date, $max_date, $activity_id, $user_type);
        }
        $statement->execute();
        $all_views_result = $statement->get_result();
        return mysqli_fetch_array($all_views_result)[0];
    }
}
