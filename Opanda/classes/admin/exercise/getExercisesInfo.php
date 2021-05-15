<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/admin.php');
class ExercisesInfo extends ConnectAdmin
{
    function __construct()
    {
        $db = new DB();
        $this->getExerciseInfo($db->getMysqli());
    }
}
$info = new ExercisesInfo();
