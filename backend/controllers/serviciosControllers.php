<?php

namespace Controllers;

use Model\Servicio;

class serviciosControllers
{

    public static function getServicios()
    {
        $servicios = Servicio::all();
        echo json_encode($servicios);
    }

    public static function getServiciosId($id)
    {

        $servicio = Servicio::where('id', $id);

        // Validar si existe el servicio
        if (!$servicio) {
            $respuesta = [
                'tipo' => 'error',
                'mensaje' => 'No existe ese servicio'
            ];
            echo json_encode($respuesta);
            return;
        }

        echo json_encode($servicio);
    }

    public static function postServicio()
    {
        $servicio = new Servicio;


        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            $servicio->sincronizar($_POST);

            // Validar campos vacios
            if (!$servicio->nombre || !$servicio->precio) {
                $res = [
                    'tipo' => 'error',
                    'msg' => 'Ningun campo puede ir vacio'
                ];
                echo json_encode($res);
                return;
            }
     
            $servicio->crear();

            $respuesta = [
                'tipo' => 'exito',
                'mensaje' => 'Servicio creado correctamente',
            ];

            echo json_encode($respuesta);

        }
    }

    public static function putServicio($id)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $servicio = Servicio::where('id', $id);
         

            // Validar que el servicio exista
            if (!$servicio) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un Error al actualizar el servicio'
                ];
                echo json_encode($respuesta);
                return;
            }

            $servicioPut = new Servicio($_POST);
            $servicioPut->id = $servicio->id;
            $resultado = $servicioPut->actualizar();
         
            if ($resultado) {
                $respuesta = [
                    'tipo' => 'exito',
                    'id' => $servicioPut->id,
                    'mensaje' => 'Actualizado correctamente'
                ];
                echo json_encode(['respuesta' => $respuesta]);
            }
        }
    }

    public static function deleteServicio($id)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            // Validar que el servicio exista
            $servicio = Servicio::where('id', $id);

            // Validar si existe el servicio
            if (!$servicio) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Ese servicio no existe'
                ];
                echo json_encode($respuesta);
                return;
            }

            $servicioDelete = new Servicio($_POST);
            $servicioDelete->id = $servicio->id;

            $resultado = $servicioDelete->eliminar();


            $resultado = [
                'mensaje' => 'Eliminado Correctamente',
                'tipo' => 'exito'
            ];

            echo json_encode($resultado);
        }
    }
    
}
