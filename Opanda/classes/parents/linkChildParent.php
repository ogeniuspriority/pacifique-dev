<?php

require_once('../../helpers/db.php');
require_once('../../helpers/connect/parents.php');
class LinkChildParent extends ConnectParent
{
    function __construct()
    {
        $db = new DB();
        $this->linkParentChildren($db->getMysqli());
    }
}
$link = new LinkChildParent();
