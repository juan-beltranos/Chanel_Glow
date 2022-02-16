<?php

namespace Model;

class Servicio extends ActiveRecord {
    // BD
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id','nombre','apellido','password','telefono','admin','confirmado','token'];

    public $id;
    public $nombre;
    public $apellido;
    public $password;
    public $telefono;
    public $admin;
    public $confirmado;
    public $token;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->admin = $args['admin'] ?? '';
        $this->confirmado = $args['confirmado'] ?? '';
        $this->token = $args['token'] ?? '';
    }

}
