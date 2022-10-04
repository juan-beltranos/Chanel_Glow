<?php

namespace Controllers;

use Model\AdminCita;

class adminController
{

    public static function index()
    {

        $fecha = $_GET['fecha'];

        // Consultar todas las citas con sus usuarios y servcios
        $consulta = " SELECT citas.id, citas.hora, CONCAT( usuarios.nombre, ' ', usuarios.apellido) as cliente, ";
        $consulta .= " usuarios.email, usuarios.telefono, servicios.nombre as servicio, servicios.precio  ";
        $consulta .= " FROM citas ";
        $consulta .= " LEFT OUTER JOIN usuarios ";
        $consulta .= " ON citas.usuarioId=usuarios.id  ";
        $consulta .= " LEFT OUTER JOIN citasServicios ";
        $consulta .= " ON citasServicios.citaId=citas.id ";
        $consulta .= " LEFT OUTER JOIN servicios ";
        $consulta .= " ON servicios.id=citasServicios.servicioId ";
        $consulta .= " WHERE fecha = '${fecha}' ";

        $citas =  AdminCita::SQL($consulta);

        echo json_encode($citas);
    }

    public static function citaClienteId()
    {

        $idCliente = $_GET['id_cliente'];

        // Consultar todas las citas de los cliente por Id_cliente
        $consulta = " SELECT citas.id,usuarios.id AS id_cliente,citas.fecha,citas.hora,servicios.nombre AS servicio, servicios.precio";
        $consulta .= " FROM citas  ";
        $consulta .= " LEFT OUTER JOIN usuarios ";
        $consulta .= " ON citas.usuarioId=usuarios.id  ";
        $consulta .= " LEFT OUTER JOIN citasServicios ";
        $consulta .= " ON citasServicios.citaId=citas.id ";
        $consulta .= " LEFT OUTER JOIN servicios ";
        $consulta .= " ON servicios.id=citasServicios.servicioId ";
        $consulta .= " WHERE usuarios.id = ${idCliente}";

        $citasCliente =  AdminCita::SQL($consulta);

        echo json_encode($citasCliente);
    }
}
