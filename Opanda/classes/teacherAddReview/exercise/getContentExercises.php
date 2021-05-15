<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/teachersAddReview.php');
class ContentExercises extends ConnectTeacherAddReview
{
    function __construct()
    {
        $db = new DB();
        $this->getExerciseContent($db->getMysqli());
    }
}
$con = new ContentExercises();
