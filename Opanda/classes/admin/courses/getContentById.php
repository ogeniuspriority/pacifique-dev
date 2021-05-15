<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/admin.php');
class ContentById extends ConnectAdmin
{
    function __construct()
    {
        $db = new DB();
        $this->getContentById($db->getMysqli());
    }
}
$con = new ContentById();
