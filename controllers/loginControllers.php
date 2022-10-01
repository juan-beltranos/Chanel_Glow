<?php

namespace Controllers;

use Model\Login;

class loginControllers
{

    public static function login()
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
                if (password_verify($_POST['contraseña'], $usuario->contraseña)) {

                    // Iniciar la sesión
                    // session_start();
                    //session_destroy();
                    $_SESSION['id'] = $usuario->id;
                    $_SESSION['nombre'] = $usuario->nombre;
                    $_SESSION['apellido'] = $usuario->apellido;
                    $_SESSION['email'] = $usuario->email;
                    $_SESSION['login'] = true;

                    // Redireccionar
                    $respuesta = [
                        'login' => true,
                        'nombre' => $_SESSION['nombre'],
                        'apellido' => $_SESSION['apellido'],
                        'id_user' => $_SESSION['id'],
                        'admin' =>  $usuario->admin
                    ];
                    http_response_code(200);
                    echo json_encode($respuesta);
                } else {
                    // Contraseña invalida
                    $respuesta = [
                        'tipo' => 'error',
                        'mensaje' => 'Password incorrecto'
                    ];
                    http_response_code(200);
                    echo json_encode($respuesta);
                }
            }
        }
    }

    public static function logout()
    {
        session_destroy();
        $_SESSION = [];
        $respuesta = [
            'tipo' => 'exito',
            'mensaje' => 'Cierre de sesion exitoso'
        ];
        http_response_code(200);
        echo json_encode($respuesta);
        return;
    }

    public static function postUsuarios()
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
                    http_response_code(200);
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
