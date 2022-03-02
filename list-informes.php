<?php 
require 'include/conexion.php';
if ($stmt = $mysqli->prepare('call sp_resoluciones_all')) {
    $stmt->execute();
    $data = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
} else echo 'Error al ejecutar el procedimiento' . $mysqli->error;
$mysqli->close();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Defensoría del Asegurado - Resoluciones</title>
    <link rel="stylesheet" href="assets/css/jquery.loadingModal.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://code.jquery.com/jquery-3.0.0.js"></script>
    <script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
    <script src="assets/js/jquery.loadingModal.min.js"></script>
    <script src="assets/js/listado.js"></script>
</head>
<body>
    <table id="example" class="table-list" style="width:100%">
        <thead>
            <tr>
                <td><select id="slt-anio"></select></td>
                <td><select id="slt-rslc" disabled></select></td>
                <td><select id="slt-prod" disabled></select></td>
                <td><select id="slt-tema" disabled></select></td>
            </tr>
            <tr>
                <th>Año</th>
                <th>Resolución</th>
                <th>Producto</th>
                <th>Tema</th>
                <th>Resultado</th>
                <th>Resolución impugnada</th>
                <th>Descargar</th>
            </tr>
        </thead>
        <tbody>
            <?php
            if (count($data))
                foreach ($data as $dt) {
                    echo '<tr>'.
                        '<td>'.$dt['anio'].'</td>'.
                        '<td>'.$dt['resolucion'].'</td>'.
                        '<td>'.$dt['producto'].'</td>'.
                        '<td>'.$dt['tema'].'</td>'.
                        '<td>'.$dt['resultado'].'</td>'.
                        '<td>'.$dt['impugnada'].'</td>'.
                        '<td><a href="'.$dt['url'].'" download>Descargar</a></td>'.
                        '</tr>';
                }
            else
                echo '<tr><td colspan="8">No hay registros.</td></tr>';  
            ?>
        </tbody>
    </table>
    <button id="btn-clear">Limpiar</button>
    <div class="fila">
        <div id="div-span" class="columna columna-1 span-fail">
            <center><p><b>¡Atención!</b> <span id="msj-rqst"></span></p></center>
        </div>
    </div>
</body>
</html>
