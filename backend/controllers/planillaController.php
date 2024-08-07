<?php

namespace Controllers;

use Model\Planilla;

class planillaController
{
    
    public static function getPlanillas()
    {
        $planillas = Planilla::all();
        echo json_encode($planillas);
    }

    public static function getPlanillaId($id)
    {
        $planilla = Planilla::where('id', $id);

        // Validar si existe la planilla
        if (!$planilla) {
            $respuesta = [
                'tipo' => 'error',
                'mensaje' => 'No existe esa planilla'
            ];
            echo json_encode($respuesta);
            return;
        }

        echo json_encode($planilla);
    }

    public static function postPlanilla()
    {
        $planilla = new Planilla;

        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            $planilla->sincronizar($_POST);

            // Validar campos vacíos
            $errores = [];

            if (empty($planilla->nombre)) $errores[] = 'El nombre es obligatorio.';
            if (empty($planilla->fecha)) $errores[] = 'La fecha es obligatoria.';
            if (empty($planilla->cc)) $errores[] = 'La cédula de ciudadanía es obligatoria.';
            if (empty($planilla->edad) || $planilla->edad <= 0) $errores[] = 'La edad es obligatoria y debe ser un número positivo.';
            if (empty($planilla->fechaNacimiento)) $errores[] = 'La fecha de nacimiento es obligatoria.';
            if (empty($planilla->estadoCivil)) $errores[] = 'El estado civil es obligatorio.';
            if (empty($planilla->contactoPersonal)) $errores[] = 'El contacto personal es obligatorio.';
            if (empty($planilla->motivoConsulta)) $errores[] = 'El motivo de la consulta es obligatorio.';
            if (empty($planilla->patologiaActual)) $errores[] = 'La patología actual es obligatoria.';
            if (empty($planilla->regularidadPeriodo)) $errores[] = 'La regularidad del periodo es obligatoria.';
            if (empty($planilla->metodoPlanificacion)) $errores[] = 'El método de planificación es obligatorio.';

            // Validar si hay errores
            if (!empty($errores)) {
                $res = [
                    'tipo' => 'error',
                    'msg' => implode(' ', $errores)
                ];
                echo json_encode($res);
                return;
            }

            $planilla->crear();

            $respuesta = [
                'tipo' => 'exito',
                'mensaje' => 'Planilla creada correctamente',
            ];

            echo json_encode($respuesta);
        }
    }

    public static function putPlanilla($id)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $planilla = Planilla::where('id', $id);

            // Validar que la planilla exista
            if (!$planilla) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un error al actualizar la planilla, no existe esa planilla.'
                ];
                echo json_encode($respuesta);
                return;
            }

            // Crear un array con los datos de $_POST excluyendo 'usuario_id'
            $data = $_POST;
            unset($data['usuario_id']);
            unset($data['cita_id']);

            // Crear la instancia de Planilla con los datos modificados
            $planillaPut = new Planilla($data);

            // Asegurar que el id y usuario_id no cambien
            $planillaPut->id = $planilla->id;
            $planillaPut->usuario_id = $planilla->usuario_id;
            $planillaPut->cita_id = $planilla->cita_id;

            // Actualizar la planilla
            $resultado = $planillaPut->actualizar();

            if ($resultado) {
                $respuesta = [
                    'tipo' => 'exito',
                    'id' => $planillaPut->id,
                    'mensaje' => 'Actualizado correctamente'
                ];
                echo json_encode(['respuesta' => $respuesta]);
            }
        }
    }

    public static function deletePlanilla($id)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Validar que la planilla exista
            $planilla = Planilla::where('id', $id);

            // Validar si existe la planilla
            if (!$planilla) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Esa planilla no existe'
                ];
                echo json_encode($respuesta);
                return;
            }

            $planillaDelete = new Planilla($_POST);
            $planillaDelete->id = $planilla->id;

            $resultado = $planillaDelete->eliminar();

            $resultado = [
                'mensaje' => 'Eliminado Correctamente',
                'tipo' => 'exito'
            ];

            echo json_encode($resultado);
        }
    }

}
