<?php

namespace Controllers;

use Model\Login;
use MVC\Router;

class loginControllers
{

    public static function login(Router $router)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario = new Login($_POST);
            
            $usuario->validarLogin();

            // Verificar quel el usuario exista
            $usuario = Login::where('email', $usuario->email);

            if (!$usuario) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'El Usuario No Existe'
                ];
                echo json_encode($respuesta);
                return;
            } else {
                // El Usuario existe
                if (password_verify($_POST['password'], $usuario->password)) {

                    // Iniciar la sesión
                    session_start();
                    $_SESSION['id'] = $usuario->id;
                    $_SESSION['nombre'] = $usuario->nombre;
                    $_SESSION['email'] = $usuario->email;
                    $_SESSION['login'] = true;

                    // Redireccionar
                    $respuesta = [
                        'tipo' => 'exito',
                        'mensaje' => 'Login exitoso'
                    ];
                    echo json_encode($respuesta);
                } else {
                    // Contraseña invalida
                    $respuesta = [
                        'tipo' => 'error',
                        'mensaje' => 'Password incorrecto'
                    ];
                    echo json_encode($respuesta);
                }
            }
        }
    }

    public static function logout() {
        session_destroy();
        $_SESSION = [];
        $respuesta = [
            'tipo' => 'exito',
            'mensaje' => 'Cierre de sesion exitoso'
        ];
        echo json_encode($respuesta);
        return;
    }

    public static function postUsuarios(Router $router)
    {

        $usuario = new Login;

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario->sincronizar($_POST);
            // Validar campos
            $usuario->validarNuevaCuenta();

            // Validar si existe el usuario
            $existeUsuario = Login::where('email', $usuario->email);

            if ($existeUsuario) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'El usuario ya existe'
                ];
                echo json_encode($respuesta);
                return;
            } else {
                // Hashear el password
                $usuario->hashPassword();

                // Generar el Token
                $usuario->crearToken();

                // Crear un nuevo usuario
                $resultado =  $usuario->crear();

                if ($resultado) {
                    $respuesta = [
                        'tipo' => 'exito',
                        'mensaje' => 'El usuario se registro correctamente'
                    ];
                    echo json_encode($respuesta);
                    return;
                } else {
                    $respuesta = [
                        'tipo' => 'error',
                        'mensaje' => 'Hubo en error en el servidor'
                    ];
                    echo json_encode($respuesta);
                    return;
                }
            }
        }
    }
}
