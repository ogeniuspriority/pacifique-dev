<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/teachersAddReview.php');
class ContentById extends ConnectTeacherAddReview
{
    function __construct()
    {
        $db = new DB();
        $this->getContentById($db->getMysqli());
    }
}
$con = new ContentById();
