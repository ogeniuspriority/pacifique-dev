<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/teachersAddReview.php');
class ContentInfoBook extends ConnectTeacherAddReview
{
    function __construct()
    {
        $db = new DB();
        $this->getInfoBook($db->getMysqli());
    }
}
$info = new ContentInfoBook();
