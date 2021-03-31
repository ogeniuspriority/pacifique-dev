<?php

require_once('../helpers/db.php');
require_once('../helpers/connect.php');
class Units extends Connect
{
    function __construct()
    {
        $db = new DB();
        $this->getUnits($db->getMysqli());
    }
}
$units = new Units();
