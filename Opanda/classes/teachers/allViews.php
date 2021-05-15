<?php

require_once('../../helpers/db.php');
require_once('../../helpers/connect/teachers.php');
class AllViews extends ConnectTeacher
{
    function __construct()
    {
        $db = new DB();
        $this->getAllViews($db->getMysqli());
    }
}
$allViews = new AllViews();
