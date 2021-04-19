<?php

require_once('../helpers/db.php');
require_once('../helpers/connect.php');
class UnlinkChild extends Connect
{
    function __construct()
    {
        $db = new DB();
        $this->unlinkChild($db->getMysqli());
    }
}
$unlink = new UnlinkChild();
