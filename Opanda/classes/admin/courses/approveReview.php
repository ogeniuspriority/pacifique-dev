<?php
require_once('../../../helpers/db.php');
require_once('../../../helpers/connect/admin.php');
class ApproveReview extends ConnectAdmin
{
    function __construct()
    {
        $db = new DB();
        $this->approveReview($db->getMysqli());
    }
}
$approve = new ApproveReview();
