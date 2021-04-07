<?php

require_once('../helpers/db.php');
require_once('../helpers/connect.php');
class AllViews extends Connect
{
    function __construct()
    {
        $db = new DB();
        $this->getAllViews($db->getMysqli());
    }
}
$allViews = new AllViews();
