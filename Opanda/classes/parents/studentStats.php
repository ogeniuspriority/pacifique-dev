<?php

require_once('../../helpers/db.php');
require_once('../../helpers/connect/parents.php');
class Student extends ConnectParent
{
    function __construct()
    {
        $db = new DB();
        $this->getChildrenStatistics($db->getMysqli());
    }
}
$std = new Student();
