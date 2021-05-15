<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/admin.php');
class ContentExercises extends ConnectAdmin
{
    function __construct()
    {
        $db = new DB();
        $this->getExerciseContent($db->getMysqli());
    }
}
$con = new ContentExercises();
