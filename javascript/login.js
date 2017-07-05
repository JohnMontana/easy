function init(){
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var usuario = $('#usuario').val();
        var correo = $('#correo').val();
        var contra = $('#contrasenia').val();
        var contra2 = $('#contrasenia2').val();
        var tipousuario = $('input:radio[name=tipo_usuario]:checked').val();
    $.ajax({
			type:'POST',
			url: 'login.php',
            dataType: 'json',
            data:{nombre: nombre, apellido: apellido, usuario: usuario, correo: correo, contrasenia: contra, contrasenia2: contra2,tipo_usuario: tipousuario, tag: 'registrar'}
            }).done(function(respuesta){
                if(respuesta==1){
                   swal('Registrado','Se ha registrado correctamente','success');
                    $('#nombre').val('');
                    $('#apellido').val('');
                    $('#usuario').val('');
                    $('#correo').val('');
                    $('#contrasenia').val('');
                    $('#contrasenia2').val('');
                    $('input:radio[name=tipo_usuario]:checked').val('');
                }else if(respuesta==2){
                    swal('Error','La contrasenia no conciden','error');
                }else{
                    swal('Error','No se puede registrar','error');
                }
            });
        }
        function iniciar(){
            var usuario = $('#usuario').val();
            var contra = $('#contrasenia').val();
            $.ajax({
                type: 'POST',
                url: 'login.php',
                dataType: 'json',
                data:{usuario:usuario, contrasenia:contra, tag:'iniciarsesion'}
            }).done(function(respuesta){
               if(respuesta==1){
                   swal('Bienvenido','Bienvenido a Easy Taxi', 'success');
                   location.href="inicio.html";
               }else{
                   swal('Error', 'Usurio o contrasenia Incorrecto','error');
                   $('#contrasenia').val('');
               }
            });
        }