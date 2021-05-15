<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/admin.php');
class ContentBook extends ConnectAdmin
{
    function __construct()
    {
        $db = new DB();
        $this->getBookContent($db->getMysqli());
    }
}
$con = new ContentBook();
