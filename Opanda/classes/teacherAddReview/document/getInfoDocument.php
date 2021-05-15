<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/teachersAddReview.php');
class ContentInfoDocument extends ConnectTeacherAddReview
{
    function __construct()
    {
        $db = new DB();
        $this->getInfoDocument($db->getMysqli());
    }
}
$infoDoc = new ContentInfoDocument();
