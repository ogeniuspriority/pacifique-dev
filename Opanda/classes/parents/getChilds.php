<?php
require_once('../../helpers/db.php');
require_once('../../helpers/connect/parents.php');
class GetChilds extends ConnectParent
{
    function __construct()
    {
        $db = new DB();
        $this->getChildren($db->getMysqli());
    }
}
$link = new GetChilds();
