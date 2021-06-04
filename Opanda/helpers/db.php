<?php
class DB
{
    public $db;
    public $user;
    public $pass;
    public $host = 'localhost';
    public $mysqli;

    // method declaration
    function __construct()
    {
        $this->db = 'opanda';
        $this->user = "panda_lab_";
        $this->pass = "@Panda_@";

        $this->mysqli = new mysqli($this->host, $this->user, $this->pass, $this->db) or die($this->mysqli->error);
    }
    // method declaration
    public function getMysqli()
    {
        return $this->mysqli;
    }
}
