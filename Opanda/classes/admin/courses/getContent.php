<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/admin.php');
class Content extends ConnectAdmin
{
    function __construct()
    {
        $db = new DB();
        $this->getCourseInfos($db->getMysqli());
    }
}
$content = new Content();
