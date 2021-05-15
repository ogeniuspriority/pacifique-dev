<?php

require_once('../../helpers/db.php');
require_once('../../helpers/connect/parents.php');
class DrawChart extends ConnectParent
{
    function __construct()
    {
        $db = new DB();
        $this->drawChart($db->getMysqli());
    }
}
$chart = new DrawChart();
