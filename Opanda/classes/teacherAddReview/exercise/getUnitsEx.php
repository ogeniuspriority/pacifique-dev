<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/teachersAddReview.php');
class Units extends ConnectTeacherAddReview
{
    function __construct()
    {
        $db = new DB();
        $this->getUnitsEx($db->getMysqli());
    }
}
$unit = new Units();
