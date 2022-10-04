<?php

require_once __DIR__ . '../../includes/app.php';

use Controllers\adminController;
use Controllers\citaControllers;
use Controllers\loginControllers;
use Controllers\serviciosControllers;

use MVC\Router;

$router = new Router();


// Usuarios
$router->post('/api/usuarios', [loginControllers::class, 'postUsuarios']);
$router->post('/api/login', [loginControllers::class, 'login']);
$router->post('/api/logout', [loginControllers::class, 'logout']);

// Servicios
$router->get('/api/servicios', [serviciosControllers::class, 'getServicios']);
$router->get('/api/serviciosId', [serviciosControllers::class, 'getServiciosId']);
$router->post('/api/servicios', [serviciosControllers::class, 'postServicio']);
$router->post('/api/servicios/actualizar', [serviciosControllers::class, 'putServicio']);
$router->post('/api/servicios/eliminar', [serviciosControllers::class, 'deleteServicio']);

// Citas
$router->get('/api/citas', [citaControllers::class, 'getCitas']);
$router->get('/api/citasId', [citaControllers::class, 'getCitasId']);
$router->post('/api/citas', [citaControllers::class, 'postCitas']);
$router->post('/api/citas/actualizar', [citaControllers::class, 'putCitas']);
$router->post('/api/citas/eliminar', [citaControllers::class, 'deleteCita']);

// Admin
$router->get('/api/citasClientesAll', [adminController::class, 'index']);
$router->get('/api/citasClientes', [adminController::class, 'citaClienteId']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();
