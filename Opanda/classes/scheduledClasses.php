<?php

require_once('../helpers/db.php');
require_once('../helpers/connect.php');
class ScheduledClasses extends Connect
{
    function __construct()
    {
        $db = new DB();
        $this->getScheduledClasses($db->getMysqli());
    }
}
$classes = new ScheduledClasses();
