<?php

require_once('../../helpers/db.php');
require_once('../../helpers/connect/parents.php');
class AskTeachersHelpMail extends ConnectParent
{
    function __construct()
    {
        $db = new DB();
        $this->sendMail($db->getMysqli());
    }
}
$mail = new AskTeachersHelpMail();
