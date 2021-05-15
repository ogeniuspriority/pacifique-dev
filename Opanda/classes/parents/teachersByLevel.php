<?php

require_once('../../helpers/db.php');
require_once('../../helpers/connect/parents.php');
class TeachersByLevel extends ConnectParent
{
    function __construct()
    {
        $db = new DB();
        $this->getTeachersHelp($db->getMysqli());
    }
}
$teachers = new TeachersByLevel();
