<?php

require_once('../../helpers/db.php');
require_once('../../helpers/connect/teachers.php');
class Subject extends ConnectTeacher
{
    function __construct()
    {
        $db = new DB();
        $this->getSubjects($db->getMysqli());
    }
}
$sub = new Subject();
