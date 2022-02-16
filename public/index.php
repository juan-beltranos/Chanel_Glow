<?php

require_once __DIR__ . '/../includes/app.php';

use Controllers\citasControllers;
use MVC\Router;

$router = new Router();


// Servicios
$router->get('/api/servicios', [citasControllers::class, 'getServicios']);
$router->post('/api/servicios', [citasControllers::class, 'postServicio']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();
