<?php

require_once('../helpers/db.php');
require_once('../helpers/connect.php');
class TeachersByLevel extends Connect
{
    function __construct()
    {
        $db = new DB();
        $this->getTeachersHelp($db->getMysqli());
    }
}
$teachers = new TeachersByLevel();
