<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/admin.php');
class ContentInfoBook extends ConnectAdmin
{
    function __construct()
    {
        $db = new DB();
        $this->getInfoBook($db->getMysqli());
    }
}
$info = new ContentInfoBook();
