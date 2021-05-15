<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/teachersAddReview.php');
class ContentBook extends ConnectTeacherAddReview
{
    function __construct()
    {
        $db = new DB();
        $this->getBookContent($db->getMysqli());
    }
}
$con = new ContentBook();
