<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/teachersAddReview.php');
class Subjects extends ConnectTeacherAddReview
{
    function __construct()
    {
        $db = new DB();
        $this->getCourses($db->getMysqli());
    }
}
$sub = new Subjects();
