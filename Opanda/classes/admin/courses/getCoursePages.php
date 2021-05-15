<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/admin.php');
class Pages extends ConnectAdmin
{
    function __construct()
    {
        $db = new DB();
        $this->getCoursePages($db->getMysqli());
    }
}
$page = new Pages();
