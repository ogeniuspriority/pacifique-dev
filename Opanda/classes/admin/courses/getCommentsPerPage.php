<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/admin.php');
class CommentsPerPage extends ConnectAdmin
{
    function __construct()
    {
        $db = new DB();
        $this->getCommentsPerePage($db->getMysqli());
    }
}
$comments = new CommentsPerPage();
