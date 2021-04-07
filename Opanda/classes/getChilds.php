<?php

require_once('../helpers/db.php');
require_once('../helpers/connect.php');
class GetChilds extends Connect
{
    function __construct()
    {
        $db = new DB();
        $this->linkParentChildren($db->getMysqli());
    }
}
$link = new GetChilds();
