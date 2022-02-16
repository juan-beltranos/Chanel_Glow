<?php

namespace Controllers;

use Model\Servicio;

class citasControllers
{
    public static function getServicios()
    {
        $servicios = Servicio::all();
        echo json_encode($servicios);
    }

    public static function postServicio()
    {
        $servicio = new Servicio;

        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            $servicio->sincronizar($_POST);


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
                'mensaje' => 'Servicio Creado Correctamente',
            ];
            echo json_encode($respuesta);
        }
    }
}
