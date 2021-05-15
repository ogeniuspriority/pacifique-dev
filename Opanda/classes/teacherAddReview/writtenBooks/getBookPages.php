<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/teachersAddReview.php');
class PageContent extends ConnectTeacherAddReview
{
    function __construct()
    {
        $db = new DB();
        $this->getBookPages($db->getMysqli());
    }
}
$pCon = new PageContent();
