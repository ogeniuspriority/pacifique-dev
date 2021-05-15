<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/admin.php');
class ContentDocument extends ConnectAdmin
{
    function __construct()
    {
        $db = new DB();
        $this->getDocumentContent($db->getMysqli());
    }
}
$con = new ContentDocument();
