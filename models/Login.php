<?php

namespace Model;

class Login extends ActiveRecord
{
    // BD
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id', 'nombre', 'apellido', 'email', 'contraseña', 'telefono', 'admin', 'confirmado', 'token'];

    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $contraseña;
    public $telefono;
    public $admin;
    public $confirmado;
    public $token;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->contraseña = $args['contraseña'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->admin = $args['admin'] ?? '0';
        $this->confirmado = $args['confirmado'] ?? '0';
        $this->token = $args['token'] ?? '';
    }

    // Validación para cuentas nuevas
    public function validarNuevaCuenta()
    {

        if (!$this->nombre) {
            $respuesta = [
                'tipo' => 'error',
                'mensaje' => 'El nombre es obligatorio'
            ];
            echo json_encode($respuesta);
            return;
        }
        if (!$this->apellido) {
            $respuesta = [
                'tipo' => 'error',
                'mensaje' => 'El apellido es obligatorio'
            ];
            echo json_encode($respuesta);
            return;
        }
        if (!$this->email) {
            $respuesta = [
                'tipo' => 'error',
                'mensaje' => 'El email es obligatorio'
            ];
            echo json_encode($respuesta);
            return;
        }
        if (!$this->contraseña) {
            $respuesta = [
                'tipo' => 'error',
                'mensaje' => 'El password es obligatorio'
            ];
            echo json_encode($respuesta);
            return;
        }
        if (strlen($this->contraseña) < 6) {
            $respuesta = [
                'tipo' => 'error',
                'mensaje' => 'El password debe tener al menos 6 caracteres'
            ];
            echo json_encode($respuesta);
            return;
        }
    }

    // Hashea el password
    public function hashPassword(): void
    {
        $this->contraseña = password_hash($this->contraseña, PASSWORD_BCRYPT);
    }

    // Generar un Token
    public function crearToken(): void
    {
        $this->token = uniqid();
    }

    // Validar el Login de Usuarios
    public function validarLogin()
    {
        if (!$this->email) {
            $respuesta = [
                'tipo' => 'error',
                'mensaje' => 'El email es obligatorio'
            ];
            echo json_encode($respuesta);
            return;
        }
        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $respuesta = [
                'tipo' => 'error',
                'mensaje' => 'El email no es valido'
            ];
            echo json_encode($respuesta);
            return;
        }
        if (!$this->contraseña) {
            $respuesta = [
                'tipo' => 'error',
                'mensaje' => 'La contraseña es obligatoria'
            ];
            echo json_encode($respuesta);
            return;
        }

        return;
    }
    
}
