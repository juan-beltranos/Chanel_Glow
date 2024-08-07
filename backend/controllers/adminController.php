<?php

namespace Controllers;

use Model\AdminCita;

class adminController
{

    public static function index($fecha)
    {
        $fechaSelect = $fecha;

        // Consultar todas las citas con sus usuarios y servicios
        $consulta = "SELECT citas.id, citas.hora, CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS cliente, ";
        $consulta .= "usuarios.email, usuarios.telefono, servicios.nombre AS servicio, servicios.precio ";
        $consulta .= "FROM citas ";
        $consulta .= "LEFT OUTER JOIN usuarios ON citas.usuarioId = usuarios.id ";
        $consulta .= "LEFT OUTER JOIN citasServicios ON citasServicios.citaId = citas.id ";
        $consulta .= "LEFT OUTER JOIN servicios ON servicios.id = citasServicios.servicioId "; 
        $consulta .= "WHERE fecha = '${fechaSelect}' ";

        // Ejecutar la consulta
        $citas = AdminCita::SQL($consulta);

        // Verificar si se encontraron citas
        if (empty($citas)) {
            $respuesta = [
                'tipo' => 'error',
                'mensaje' => 'No se encontraron citas para esta fecha.'
            ];
            echo json_encode($respuesta);
            return;
        }

        // Retornar las citas en formato JSON
        echo json_encode($citas);
    }


    public static function citaClienteId($id)
    {
        $idCliente = $id;

        // Consultar todas las citas del cliente por Id_cliente
        $consulta = " SELECT citas.id, usuarios.id AS id_cliente, citas.fecha, citas.hora, servicios.nombre AS servicio, servicios.precio";
        $consulta .= " FROM citas";
        $consulta .= " LEFT OUTER JOIN usuarios ON citas.usuarioId = usuarios.id";
        $consulta .= " LEFT OUTER JOIN citasServicios ON citasServicios.citaId = citas.id";
        $consulta .= " LEFT OUTER JOIN servicios ON servicios.id = citasServicios.servicioId";
        $consulta .= " WHERE usuarios.id = ${idCliente}";
        $consulta .= " ORDER BY citas.fecha DESC";

        $citasCliente = AdminCita::SQL($consulta);

        echo json_encode($citasCliente);
    }
    
}
