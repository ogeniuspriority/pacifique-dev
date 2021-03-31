<?php

require_once('../helpers/db.php');
require_once('../helpers/connect.php');
class UniqueViews extends Connect
{
    function __construct()
    {
        $db = new DB();
        $this->getUniqueViews($db->getMysqli());
    }
}
$uniqueViews = new UniqueViews();
