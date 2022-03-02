<?php
require_once 'config.php';
//intento de conexion
$mysqli = new mysqli($hostname, $username, $password, $database);
if ($mysqli->connect_errno) {
    die('Error de conexión ('.$mysqli->connect_errno.') '.$mysqli->connect_error);    
}
$mysqli->set_charset("utf8");
?>