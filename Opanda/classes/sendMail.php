<?php

require_once('../helpers/db.php');
require_once('../helpers/connect.php');
class AskTeachersHelpMail extends Connect
{
    function __construct()
    {
        $db = new DB();
        $this->sendMail($db->getMysqli());
    }
}
$mail = new AskTeachersHelpMail();
