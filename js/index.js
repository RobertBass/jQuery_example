var estudiante = [];


// Función para crear tabla y agregar datos
function crearTabla() {
    var tabla = "";
    var ptabla = $("#tabla");

    tabla += '<table border="1">';
    tabla += '<tr>';
    tabla += '<th>Codigo</th>';
    tabla += '<th>Nombre</th>';
    tabla += '<th>Nota</th>';
    tabla += '<th>Editar</th>';
    tabla += '<th>Eliminar</th>';
    tabla += '</tr>';

    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        var estudiante = $.parseJSON(localStorage.getItem(clave));

        tabla += '<tr>';
        tabla += '<td>' + estudiante.codigo + '</td>';
        tabla += '<td>' + estudiante.nombre + '</td>';
        tabla += '<td>' + estudiante.nota + '</td>';
        tabla += '<td><button onclick="editar(\'' + estudiante.codigo + '\');">Editar</button></td>';
        tabla += '<td><button onclick="eliminar(\'' + estudiante.codigo + '\');">Eliminar</button></td>';
        tabla += '</tr>';
    }

    tabla += '</table>';
    $(ptabla).html(tabla);

}


// Funcion para Editar Registro
function editar(codigo) {

    var estudiante;
    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);

        if (clave == codigo) {
            estudiante = $.parseJSON(localStorage.getItem(clave));

            $("#codigo").val(estudiante.codigo);
            $("#nombre").val(estudiante.nombre);
            $("#nota").val(estudiante.nota);
        }
    }
}


// Funcion para Eliminar Registro
function eliminar(codigo) {

    localStorage.removeItem(codigo);
    crearTabla();

}


// Funcion para limpiar Local Storage
function clearLocalStorage() {
    localStorage.clear();
    crearTabla();
    contador = 1;
    $("#codigo").val(contador);
}


// Funcion para Mostrar el Promedio de las Notas
function Promedio() {

    var estudiante;
    var suma = 0;
    var res;

    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        estudiante = $.parseJSON(localStorage.getItem(clave));

        suma += parseInt(estudiante.nota);
    
    }

    var cant = i;
    var res = suma / cant;

    $("#resultado").html("El Promedio de las Notas es: " + res);

}


// Funcion para mostrar la Nota Mayor
function notaMayor() {
   
    var aux;
    var estudiante1;
    var estudiante2;

    for(var i = 0; i < localStorage.length; i++){
        var clave = localStorage.key(i);
        estudiante1 = $.parseJSON(localStorage.getItem(clave));

        for(var j= 0; j < localStorage.length; j++){
            var clave2 = localStorage.key(j);
            estudiante2 = $.parseJSON(localStorage.getItem(clave2));


            if(parseInt(estudiante1.nota) < parseInt(estudiante2.nota)){

                aux = estudiante1;
                estudiante1 = estudiante2;
                estudiante2 = aux;
            }

        }
    }
    $("#resultado").html("La Nota Mayor corresponde al estudiante <span>" + estudiante1.nombre + "</span> con una nota de <span>" + estudiante1.nota + "</span>");

}


// Funcion para Mostrar la Nota Menor
function notaMenor() {
   
    var aux;
    var estudiante1;
    var estudiante2;

    for(var i = 0; i < localStorage.length; i++){
        var clave = localStorage.key(i);
        estudiante1 = $.parseJSON(localStorage.getItem(clave));

        for(var j= 0; j < localStorage.length; j++){
            var clave2 = localStorage.key(j);
            estudiante2 = $.parseJSON(localStorage.getItem(clave2));


            if(parseInt(estudiante1.nota) > parseInt(estudiante2.nota)){

                aux = estudiante1;
                estudiante1 = estudiante2;
                estudiante2 = aux;
            }

        }
    }
    $("#resultado").html("La Nota Mayor corresponde al estudiante <span>" + estudiante1.nombre + "</span> con una nota de <span>" + estudiante1.nota + "</span>");

}


$(window).on("load", crearTabla);

$(document).ready(function () {

    var contador;

    if (localStorage.length > 0) {
        contador = localStorage.length + 1;
    } else {
        contador = 1;
    }

    $("#codigo").val(contador);

    $("#formulario").validate();

    $("#btn1").click(function () {
        var codigo = $("#codigo").val();
        var nombre = $("#nombre").val();
        var nota = $("#nota").val();

        var estudiante = {
            codigo: codigo,
            nombre: nombre,
            nota: nota
        };

        localStorage.setItem(codigo, JSON.stringify(estudiante));
        contador = localStorage.length + 1;

        crearTabla();
        restablecer();
    });

    function restablecer() {
        $("#codigo").val(contador);
        $("#nombre").val("");
        $("#nota").val("");
    }

    $("#btn2").click(function (event) {
        event.preventDefault();
        Promedio();
    });

    $("#btn3").click(function (event) {
        event.preventDefault();
        notaMayor();
    });

    $("#btn4").click(function (event) {
        event.preventDefault();
        notaMenor();
    });

    $("#btn5").click(function () {
        clearLocalStorage();
        $("#resultado").html("");
    });
});
