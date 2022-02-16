<?php

require_once __DIR__ . '/../includes/app.php';

use Controllers\serviciosControllers;
use MVC\Router;

$router = new Router();


// Servicios
$router->get('/api/servicios', [serviciosControllers::class, 'getServicios']);
$router->get('/api/serviciosId', [serviciosControllers::class, 'getServiciosId']);
$router->post('/api/servicios', [serviciosControllers::class, 'postServicio']);
$router->post('/api/servicios/actualizar', [serviciosControllers::class, 'putServicio']);
$router->post('/api/servicios/eliminar', [serviciosControllers::class, 'deleteServicio']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();
