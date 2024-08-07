<?php

require_once __DIR__ . '../../includes/app.php';

use Controllers\adminController;
use Controllers\citaControllers;
use Controllers\loginControllers;
use Controllers\serviciosControllers;
use Controllers\planillaController;

use MVC\Router;

$router = new Router();

// Usuarios
$router->post('/api/usuarios', [loginControllers::class, 'postUsuarios']);
$router->post('/api/login', [loginControllers::class, 'login']);
$router->post('/api/logout', [loginControllers::class, 'logout']);

// Servicios
$router->get('/api/servicios', [serviciosControllers::class, 'getServicios']);
$router->get('/api/serviciosId/{id}', [serviciosControllers::class, 'getServiciosId']);
$router->post('/api/servicios', [serviciosControllers::class, 'postServicio']);
$router->post('/api/servicios/actualizar/{id}', [serviciosControllers::class, 'putServicio']);
$router->post('/api/servicios/eliminar/{id}', [serviciosControllers::class, 'deleteServicio']);

// Citas
$router->get('/api/citas', [citaControllers::class, 'getCitas']);
$router->get('/api/citasId/{id}', [citaControllers::class, 'getCitasId']);
$router->post('/api/citas', [citaControllers::class, 'postCitas']);
$router->post('/api/citas/actualizar/{id}', [citaControllers::class, 'putCitas']);
$router->post('/api/citas/eliminar/{id}', [citaControllers::class, 'deleteCita']);

// Planillas
$router->get('/api/planillas', [planillaController::class, 'getPlanillas']);
$router->get('/api/planillaId/{id}', [planillaController::class, 'getPlanillaId']);
$router->post('/api/planilla', [planillaController::class, 'postPlanilla']);
$router->post('/api/planilla/actualizar/{id}', [planillaController::class, 'putPlanilla']);
$router->post('/api/planilla/eliminar/{id}', [planillaController::class, 'deletePlanilla']);

// Admin
$router->get('/api/citas/filtro/{fecha}', [adminController::class, 'index']);
$router->get('/api/citas/cliente/{id}', [adminController::class, 'citaClienteId']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();
