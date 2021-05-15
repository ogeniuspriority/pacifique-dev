<?php
require_once('../../helpers/db.php');
require_once('../../helpers/connect/teachersAddReview.php');
class Comment extends ConnectTeacherAddReview
{
    function __construct()
    {
        $db = new DB();
        $this->insertComment($db->getMysqli());
    }
}
$comment = new Comment();
