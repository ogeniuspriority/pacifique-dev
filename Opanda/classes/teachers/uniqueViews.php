<?php

require_once('../../helpers/db.php');
require_once('../../helpers/connect/teachers.php');
class UniqueViews extends ConnectTeacher
{
    function __construct()
    {
        $db = new DB();
        $this->getUniqueViews($db->getMysqli());
    }
}
$uniqueViews = new UniqueViews();
