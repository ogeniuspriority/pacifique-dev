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
}
