<?php

namespace Model;

class Planilla extends ActiveRecord
{
    protected static $tabla = 'planilla';
    protected static $columnasDB = [
        'id','usuario_id', 'cita_id' ,'nombre', 'fecha', 'cc', 'edad', 'fechaNacimiento', 
        'estadoCivil', 'contactoPersonal', 'motivoConsulta', 
        'patologiaActual', 'fechaUltimoPeriodo', 'regularidadPeriodo', 
        'metodoPlanificacion'
    ];

    public $id;
    public $usuario_id;
    public $cita_id;
    public $nombre;
    public $fecha;
    public $cc;
    public $edad;
    public $fechaNacimiento;
    public $estadoCivil;
    public $contactoPersonal;
    public $motivoConsulta;
    public $patologiaActual;
    public $fechaUltimoPeriodo;
    public $regularidadPeriodo;
    public $metodoPlanificacion;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->usuario_id = $args['usuario_id'] ?? '';
        $this->cita_id = $args['cita_id'] ?? '';
        $this->nombre = $args['nombre'] ?? '';
        $this->fecha = $args['fecha'] ?? '';
        $this->cc = $args['cc'] ?? '';
        $this->edad = $args['edad'] ?? 0;
        $this->fechaNacimiento = $args['fechaNacimiento'] ?? '';
        $this->estadoCivil = $args['estadoCivil'] ?? '';
        $this->contactoPersonal = $args['contactoPersonal'] ?? '';
        $this->motivoConsulta = $args['motivoConsulta'] ?? '';
        $this->patologiaActual = $args['patologiaActual'] ?? '';
        $this->fechaUltimoPeriodo = $args['fechaUltimoPeriodo'] ?? '';
        $this->regularidadPeriodo = $args['regularidadPeriodo'] ?? '';
        $this->metodoPlanificacion = $args['metodoPlanificacion'] ?? '';
    }
}
