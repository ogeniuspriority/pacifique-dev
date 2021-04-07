<?php

require_once('../helpers/db.php');
require_once('../helpers/connect.php');
class Student extends Connect
{
    function __construct()
    {
        $db = new DB();
        $this->getChildrenStatistics($db->getMysqli());
    }
}
$std = new Student();
