<?php
require_once('../../helpers/db.php');
require_once('../../helpers/connect/teachersAddReview.php');
class GetComments extends ConnectTeacherAddReview
{
    function __construct()
    {
        $db = new DB();
        $this->getComments($db->getMysqli());
    }
}
$comments = new GetComments();
