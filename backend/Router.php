<?php
namespace MVC;

class Router
{
    public array $getRoutes = [];
    public array $postRoutes = [];

    public function get($url, $fn)
    {
        $this->getRoutes[$url] = $fn;
    }

    public function post($url, $fn)
    {
        $this->postRoutes[$url] = $fn;
    }

    public function comprobarRutas()
    {
        // Proteger Rutas...
        session_start();

        $currentUrl = strtok($_SERVER['REQUEST_URI'], '?') ?? '/';
        $method = $_SERVER['REQUEST_METHOD'];

        if ($method === 'GET') {
            $fn = $this->matchRoute($currentUrl, $this->getRoutes);
        } else {
            $fn = $this->matchRoute($currentUrl, $this->postRoutes);
        }

        if ($fn) {
            // Call user fn va a llamar una función cuando no sabemos cual sera
            call_user_func($fn, $this); // This es para pasar argumentos
        } else {
            echo "Página No Encontrada o Ruta no válida";
        }
    }

    private function matchRoute($currentUrl, $routes)
    {
        foreach ($routes as $url => $fn) {
            // Convertimos la URL a un regex para que coincida con parámetros
            $pattern = preg_replace('/\{[a-zA-Z0-9_]+\}/', '([a-zA-Z0-9\-]+)', $url); // Cambié el regex a incluir guiones
            $pattern = str_replace('/', '\/', $pattern);
            $pattern = '/^' . $pattern . '$/';

            if (preg_match($pattern, $currentUrl, $matches)) {
                array_shift($matches); // Quitamos el primer elemento que es la URL completa
                return function() use ($fn, $matches) {
                    call_user_func_array($fn, $matches);
                };
            }
        }

        return null;
    }


    public function render($view, $datos = [])
    {
        // Leer lo que le pasamos a la vista
        foreach ($datos as $key => $value) {
            $$key = $value;  // Variable variable
        }

        ob_start(); // Almacenamiento en memoria durante un momento...

        // Incluir la vista en el layout
        include_once __DIR__ . "/views/$view.php";
        $contenido = ob_get_clean(); // Limpiar el buffer
        include_once __DIR__ . '/views/layout.php';
    }
}
