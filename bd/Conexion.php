<?php
class Con{
    public function Conexion() {
        $ServerName   = "localhost";
        $User         = "root";
        $Pass         = "";
        $DBName       = "unotes";
        $mysqli = new mysqli($ServerName, $User, $Pass, $DBName);
        if ($mysqli->connect_errno) {
            echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
        }
        return $mysqli;
    }
}

/*
    CREATE TABLE `usuarios` (
        `Id` int(11) NOT NULL,
        `Nombre` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
        `Email` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
        `Clave` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
        `FechaIng` date NOT NULL,
        `Habilitado` tinyint(1) NOT NULL
        )
*/ 