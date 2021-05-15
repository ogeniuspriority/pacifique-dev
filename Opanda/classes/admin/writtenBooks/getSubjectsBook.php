<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/admin.php');
class Subjects extends ConnectAdmin
{
    function __construct()
    {
        $db = new DB();
        $this->getCoursesBook($db->getMysqli());
    }
}
$sub = new Subjects();
