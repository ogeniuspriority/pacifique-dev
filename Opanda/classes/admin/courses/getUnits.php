<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/admin.php');
class Units extends ConnectAdmin
{
    function __construct()
    {
        $db = new DB();
        $this->getUnits($db->getMysqli());
    }
}
$unit = new Units();
