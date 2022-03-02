<?php
header('Content-Type: application/json');
require 'include/conexion.php';
if ($stmt = $mysqli->prepare('call sp_resoluciones_filter(?, ?, ?, ?)')) {
    $stmt->bind_param('isss', $_GET['anio'], $_GET['resolucion'], $_GET['producto'], $_GET['tema']);
    $stmt->execute();
    $data = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    echo json_encode($data);
} else echo 'Error al ejecutar el procedimiento' . $mysqli->error;
$mysqli->close();
?>