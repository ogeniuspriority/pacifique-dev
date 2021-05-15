<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/teachersAddReview.php');
class Pages extends ConnectTeacherAddReview
{
    function __construct()
    {
        $db = new DB();
        $this->getCoursePages($db->getMysqli());
    }
}
$page = new Pages();
