<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/teachersAddReview.php');
class ExercisesInfo extends ConnectTeacherAddReview
{
    function __construct()
    {
        $db = new DB();
        $this->getExerciseInfo($db->getMysqli());
    }
}
$info = new ExercisesInfo();
