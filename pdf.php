<?php
require_once 'dompdf/autoload.inc.php';
use Dompdf\Dompdf;	
$content = '<html>';
$content .= '<head>';
$content .= '</head><body>';
$content .= '<h1 style="text-align: center; font-size:30px;">Factura</h1>';
$content .= '<img src="imagenes/logoeasy.png" alt="" style="margin: 20px;"/>';
$content .= '<table width="500px" cellpadding="5px" cellspacing="25px" style="font-size: 20px; width:100%; border: 1px solid black;
    border-collapse: collapse;">';
    $content .= '<thead>';
    $content .= '<tr>';
        $content .= '<th>No.</th>';
        $content .= '<th>Concepto</th>';
        $content .= '<th>Importe</th>';
    $content .= '</tr>';
    $content .= '</thead>';
$content .= '<tbody>';
    $content .= '<tr>';
        $content .= '<td>1.</td>';
        $content .= '<td>Viaje de Easy 1.2km</td>';
        $content .= '<td>$200.00</td>';
    $content .= '</tr>';
    $content .= '<tr>';
        $content .= '<td></td>';
        $content .= '<td>Total</td>';
        $content .= '<td>$200.00</td>';
    $content .= '</tr>';
$content .= '</tbody>';
$content .= '</table>';
$dompdf = new Dompdf();
$dompdf->loadHtml($content);
$dompdf->set_paper("factura", $orientation = "landscape"); // (Opcional) Configurar papel y orientación
$dompdf->render(); // Generar el PDF desde contenido HTML
$pdf = $dompdf->output(); // Obtener el PDF generado
$dompdf->stream(); // Enviar el PDF generado al navegador

?>

