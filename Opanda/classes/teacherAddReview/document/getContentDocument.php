<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/teachersAddReview.php');
class ContentDocument extends ConnectTeacherAddReview
{
    function __construct()
    {
        $db = new DB();
        $this->getDocumentContent($db->getMysqli());
    }
}
$con = new ContentDocument();
