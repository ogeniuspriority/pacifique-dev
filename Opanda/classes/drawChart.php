<?php

require_once('../helpers/db.php');
require_once('../helpers/connect.php');
class DrawChart extends Connect
{
    function __construct()
    {
        $db = new DB();
        $this->drawChart($db->getMysqli());
    }
}
$chart = new DrawChart();
