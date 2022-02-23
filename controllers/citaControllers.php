<?php

namespace Controllers;

use Model\Citas;
use Model\CitaServicio;
use Model\Login;

class citaControllers
{
    public static function getCitas()
    {
        $citas = Citas::all();
        echo json_encode($citas);
    }

    public static function getCitasId()
    {
        $cita = Citas::where('id', $_GET['id']);
        if (!$cita) {
            $respuesta = [
                'tipo' => 'error',
                'mensaje' => 'No existe esa cita'
            ];
            echo json_encode($respuesta);
            return;
        }
        echo json_encode($cita);
    }

    public static function postCitas()
    {
        $citas = new Citas;

        if ($_SERVER['REQUEST_METHOD'] === "POST") {

            $citas->sincronizar($_POST);

            // Validar campos vacios
            if (!$citas->fecha || !$citas->hora) {
                http_response_code(400);
                $res = [
                    'tipo' => 'error',
                    'msg' => 'Ningun campo puede ir vacio'
                ];
                echo json_encode($res);
                return;
            }

            // Validar si existe ese usuario por ID
            $usuarioId = Login::where('id', $citas->usuarioId);
            if (!$usuarioId) {
                http_response_code(400);
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Ese usuario no existe',
                ];
                echo json_encode($respuesta);
                return;
            }

            // Crear e insertar la cita en la BD
            $save =  $citas->crear();
            $id = $save['id'];

            //   Almacena los servicios con el Id de la cita
            $idServicios = explode(",", $_POST['servicios']);
            foreach ($idServicios as $idServicio) {
                $args = [
                    'citaId' => $id,
                    'servicioId' => $idServicio
                ];
                $citaServicio = new CitaServicio($args);
                $citaServicio->guardar();
            }

            // Almacena la cita y el servicio
            $resultado = [
                'cita' =>  $citas,
                'servicios' => $idServicios
            ];
            if ($resultado) {
                $respuesta = [
                    'tipo' => 'exito',
                    'mensaje' => 'Cita creada correctamente'
                ];
                echo json_encode(['respuesta' => $respuesta]);
            }
        }
    }

    public static function putCitas()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Validar la cita exista
            $cita = Citas::where('id', $_GET['id']);

            if (!$cita) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Esa cita no existe'
                ];
                echo json_encode($respuesta);
                return;
            }

            $citaPut = new Citas($_POST);
            $citaPut->id = $cita->id;
            $resultado = $citaPut->actualizar();

            if ($resultado) {
                $respuesta = [
                    'tipo' => 'exito',
                    'id' => $citaPut->id,
                    'mensaje' => 'Actualizado correctamente'
                ];
                echo json_encode(['respuesta' => $respuesta]);
            }
        }
    }

    public static function deleteCita()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            // Validar que el servicio exista
            $servicio = Citas::where('id', $_GET['id']);

            if (!$servicio) {
                http_response_code(400);
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Esa cita no existe'
                ];
                echo json_encode($respuesta);
                return;
            }

            $servicioDelete = new Citas($_POST);
            $servicioDelete->id = $servicio->id;

            $resultado = $servicioDelete->eliminar();

            http_response_code(200);
            $resultado = [
                'resultado' => $resultado,
                'mensaje' => 'Eliminado Correctamente',
                'tipo' => 'exito'
            ];

            echo json_encode($resultado);
        }
    }
}
