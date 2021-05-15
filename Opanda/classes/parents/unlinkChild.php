<?php

require_once('../../helpers/db.php');
require_once('../../helpers/connect/parents.php');
class UnlinkChild extends ConnectParent
{
    function __construct()
    {
        $db = new DB();
        $this->unlinkChild($db->getMysqli());
    }
}
$unlink = new UnlinkChild();
