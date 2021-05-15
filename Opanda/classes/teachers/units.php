<?php

require_once('../../helpers/db.php');
require_once('../../helpers/connect/teachers.php');
class Units extends ConnectTeacher
{
    function __construct()
    {
        $db = new DB();
        $this->getUnits($db->getMysqli());
    }
}
$units = new Units();
