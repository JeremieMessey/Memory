<?php
require_once 'autoload.php'; //inclusion de l'Autoload
	
$controller = new controller\Controller(); //Instaciation du controller

$controller->handleRequest(); // entraine l'exécution de la fonction handleRequest();