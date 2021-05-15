<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/admin.php');
class CommentsExercises extends ConnectAdmin
{
    function __construct()
    {
        $db = new DB();
        $this->getCommentsExercises($db->getMysqli());
    }
}
$comment = new CommentsExercises();
