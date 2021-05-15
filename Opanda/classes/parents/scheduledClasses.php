<?php

require_once('../../helpers/db.php');
require_once('../../helpers/connect/parents.php');
class ScheduledClasses extends ConnectParent
{
    function __construct()
    {
        $db = new DB();
        $this->getScheduledClasses($db->getMysqli());
    }
}
$classes = new ScheduledClasses();
