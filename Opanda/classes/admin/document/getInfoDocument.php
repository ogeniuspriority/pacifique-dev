<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/admin.php');
class ContentInfoDocument extends ConnectAdmin
{
    function __construct()
    {
        $db = new DB();
        $this->getInfoDocument($db->getMysqli());
    }
}
$infoDoc = new ContentInfoDocument();
