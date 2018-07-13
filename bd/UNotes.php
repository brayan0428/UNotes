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
if($Peticion == "Cons_Periodos"){
    $IdEst = $_GET['IdEst'];
	echo $WebService->Cons_Periodos($IdEst);
}