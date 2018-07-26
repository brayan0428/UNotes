<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once('Conexion.php');

//Variable para peticiones
if(isset($_GET['Peticion'])){
	$Peticion 	= htmlentities(strip_tags($_GET['Peticion']));
}


class WebService extends Con {
    public $mysqli;
	public $Tiempo;

	function __construct(){
		$this->mysqli 	= parent::Conexion();
		$this->Tiempo	= "(((now() - INTERVAL 5 HOUR) - INTERVAL 0 MINUTE) + INTERVAL 0 SECOND)";
    }
    
    public function Cons_Usuarios($Usuario,$Clave){
		$Consulta= "SELECT Id,Nombre,'' as MsnError,'True' as Result FROM Usuarios
					where Email = '".$Usuario."' and Habilitado = 1";
		if($Clave != ''){
			$Consulta .= " and Clave = '".md5($Clave)."'";
		}
		$resultado = $this->mysqli->query($Consulta);
		$resultado->data_seek(0);
		while( $fila = $resultado->fetch_assoc() ){
			$data[] = $fila;
		}
		$Num_Filas = $resultado->num_rows;
		if($Num_Filas <= 0){
		  	return '[{"Result":"False", "Msn": "El usuario ingresado no se encuentra registrado"}]';
		}else{
     		return json_encode($data);	
		}
    }
    
	public function Insertar_Usuario($Nombre,$Email,$Clave){
		$Consulta = "insert into usuarios (Nombre,Email,Clave,Habilitado,FechaIng)
					values('" .$Nombre. "','" .$Email. "','" .md5($Clave). "',1,".$this->Tiempo.")";
		$Sentencia = $this->mysqli->prepare($Consulta);
		if (!$Sentencia){
			return '[{"Result":"False", "Msn": "Error en la sentencia"}]';
			exit();
		}
		if($Sentencia->execute()){
			return '[{"Result":"True", "Msn": "Usuario Ingresado Exitosamente"}]';
		}else{
			return '[{"Result":"False", "Msn": "Se presento un error al momento de guardar"}]';
		}
	}

	public function Cons_Periodos($IdEst){
		try{
			$Consulta= "select Nombre,Descripcion,'5' as CantMaterias from periodos where IdEst=".$IdEst." and Habilitado=1";
			$resultado = $this->mysqli->query($Consulta);
			$resultado->data_seek(0);
			while( $fila = $resultado->fetch_assoc() ){
				$data[] = $fila;
			}
			return json_encode($data);	
		}catch (Exception $e) {
			echo $e->getMessage();
		}
	}
	
	public function Cons_Materias($IdPeriodo){
		try{
			$Consulta= "select id,nombre,profesor,salon,nota1,nota2,nota3,porcentaje1,porcentaje2,porcentaje3 from materias where IdPeriodo=".$IdPeriodo;
			$resultado = $this->mysqli->query($Consulta);
			$resultado->data_seek(0);
			while( $fila = $resultado->fetch_assoc() ){
				$data[] = $fila;
			}
			return json_encode($data);	
		}catch (Exception $e) {
			echo $e->getMessage();
		}
	}

	public function Insertar_Materia($IdPeriodo,$Nombre,$Profesor,$Salon,$Nota1,$Nota2,$Nota3,$Porcentaje1,$Porcentaje2,$Porcentaje3){
		$Consulta = "insert into materias (idperiodo,nombre,profesor,salon,nota1,nota2,nota3,porcentaje1,porcentaje2,porcentaje3)
					values(". $IdPeriodo .",'" .$Nombre. "','" .$Profesor. "','" .$Salon. "',". $Nota1 .",". $Nota2 .",
					". $Nota3.",". $Porcentaje1 .",". $Porcentaje2 .",". $Porcentaje3 .")";
		$Sentencia = $this->mysqli->prepare($Consulta);
		if (!$Sentencia){
			return '[{"Result":"False", "Msn": "Error en la sentencia"}]';
			exit();
		}
		if($Sentencia->execute()){
			return '[{"Result":"True", "Msn": "Materia Ingresada Exitosamente"}]';
		}else{
			return '[{"Result":"False", "Msn": "Se presento un error al momento de guardar"}]';
		}
	}

	public function Actualizar_Materia($Id,$Nombre,$Profesor,$Salon,$Nota1,$Nota2,$Nota3,$Porcentaje1,$Porcentaje2,$Porcentaje3){
		$Consulta = "update materias set nombre = '" .$Nombre. "',profesor='" .$Profesor. "',salon='" .$Salon. "',nota1=" .$Nota1. ",nota2=" .$Nota2. ",nota3=" .$Nota3. ",porcentaje1=" .$Porcentaje1. ",porcentaje2=" .$Porcentaje2. ",porcentaje3=" .$Porcentaje3. " where id = " .$Id;
		$Sentencia = $this->mysqli->prepare($Consulta);
		if (!$Sentencia){
			return '[{"Result":"False", "Msn": "Error en la sentencia"}]';
			exit();
		}
		if($Sentencia->execute()){
			return '[{"Result":"True", "Msn": "Materia actualizada Exitosamente"}]';
		}else{
			return '[{"Result":"False", "Msn": "Se presento un error al momento de guardar"}]';
		}
	}
}
$WebService = new WebService();
if($Peticion == "Cons_Usuarios"){
    $Email = $_GET['Email'];
    $Clave = $_GET['Clave'];
	echo $WebService->Cons_Usuarios($Email,$Clave);
}
if($Peticion == "Insertar_Usuario"){
    $Nombre = $_GET['Nombre'];
    $Email = $_GET['Email'];
    $Clave = $_GET['Clave'];
	echo $WebService->Insertar_Usuario($Nombre,$Email,$Clave);
}
if($Peticion == "Insertar_Materia"){
	$IdPeriodo = $_GET['IdPeriodo'];
	$Nombre = $_GET['Nombre'];
	$Profesor = $_GET['Profesor'];
	$Salon = $_GET['Salon'];
	$Nota1 = $_GET['Nota1'];
	$Nota2 = $_GET['Nota2'];
	$Nota3 = $_GET['Nota3'];
	$Porcentaje1 = $_GET['Porcentaje1'];
	$Porcentaje2 = $_GET['Porcentaje2'];
	$Porcentaje3 = $_GET['Porcentaje3'];
	echo $WebService->Insertar_Materia($IdPeriodo,$Nombre,$Profesor,$Salon,$Nota1,$Nota2,$Nota3,$Porcentaje1,$Porcentaje2,$Porcentaje3);
}
if($Peticion == "Cons_Periodos"){
    $IdEst = $_GET['IdEst'];
	echo $WebService->Cons_Periodos($IdEst);
}
if($Peticion == "Cons_Materias"){
    $IdPeriodo = $_GET['IdPeriodo'];
	echo $WebService->Cons_Materias($IdPeriodo);
}

if($Peticion == "Actualizar_Materia"){
	$Id = $_GET['Id'];
	$Nombre = $_GET['Nombre'];
	$Profesor = $_GET['Profesor'];
	$Salon = $_GET['Salon'];
	$Nota1 = $_GET['Nota1'];
	$Nota2 = $_GET['Nota2'];
	$Nota3 = $_GET['Nota3'];
	$Porcentaje1 = $_GET['Porcentaje1'];
	$Porcentaje2 = $_GET['Porcentaje2'];
	$Porcentaje3 = $_GET['Porcentaje3'];
	echo $WebService->Actualizar_Materia($Id,$Nombre,$Profesor,$Salon,$Nota1,$Nota2,$Nota3,$Porcentaje1,$Porcentaje2,$Porcentaje3);
}