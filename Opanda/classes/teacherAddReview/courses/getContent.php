<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/teachersAddReview.php');
class Content extends ConnectTeacherAddReview
{
    function __construct()
    {
        $db = new DB();
        $this->getCourseInfos($db->getMysqli());
    }
}
$content = new Content();
