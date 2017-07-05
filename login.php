<?php
    $conexion = mysqli_connect("localhost",'root','diego','easy');
    if(!empty($_POST)){
        if($_POST['tag']=='registrar'){
            $tipo_usuario = $_POST['tipo_usuario'];
            $nombre     = mysqli_real_escape_string($conexion, $_POST['nombre']);
            $apellido     = mysqli_real_escape_string($conexion, $_POST['apellido']);
            $usuario     = mysqli_real_escape_string($conexion, $_POST['usuario']);
            $correo = mysqli_real_escape_string($conexion, $_POST['correo']);
            $contrasenia = mysqli_real_escape_string($conexion, $_POST['contrasenia']);
            $contrasenia2 = mysqli_real_escape_string($conexion, $_POST['contrasenia2']);
            if($contrasenia == $contrasenia2){
                $sha1        = sha1($contrasenia);
	           $sql   = "INSERT INTO usuario VALUES('$usuario','$nombre','$apellido','$correo','$sha1','$tipo_usuario')";
                if($conexion->query($sql)){
                    echo 1;
                }else{
                    echo 0;
                }
            }else{
                echo 2;
            }
        }
if($_POST['tag']=='iniciarsesion'){
            $usuario = mysqli_real_escape_string($conexion, $_POST['usuario']);
             $contrasenia = mysqli_real_escape_string($conexion, $_POST['contrasenia']);
            $sha1        = sha1($contrasenia);
            $sql = " SELECT * FROM usuario WHERE usuario='$usuario' AND contrasenia='$sha1'";
            $result = $conexion->query($sql);
            $rows = mysqli_num_rows($result);
            if($rows>0){
                    echo 1;
            }else{
                    echo $result->num_rows;
            }
        }
    }
   // mysqli_free_result($resultado);
    mysqli_close($conexion);
?>