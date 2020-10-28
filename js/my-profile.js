var misDatos = document.getElementsByClassName("myDatos");

function verificar()
{
    let conteo = 0;
    for (let i = 0; i < 7 ; i++)
    {
        document.getElementsByClassName("myDatos")[i].style.backgroundColor = "white";
    }
    for (let i = 0; i < 7 ; i++)
    {
        if (document.getElementsByClassName("myDatos")[i].value.length < 3 && i != 1 && i != 3)
        {
            document.getElementsByClassName("myDatos")[i].style.backgroundColor = "pink";
        }
        else if (document.getElementsByClassName("myDatos")[i].value.length > 2 && i != 1 && i != 3)
        {
            conteo++;
        }

    }
    if (conteo == 5)
    {
        alert (cargarDatos());

    }
    else {
        alert ("Llene los campos restantes "+conteo);
    }
}
function cargarDatos()
{
    for (let i = 0; i < 7; i++)
    {
        localStorage.setItem("dato"+i, misDatos[i].value.trim()); //setItem almacena el dato en la posición "usuario"
    }
    return "Datos guardados exitosamente";
}

function leerDatos(){
    for (let i = 0; i < 7; i++)
    {
        var usuario = localStorage.getItem("dato"+i);
        document.getElementsByClassName("myDatos")[i].value=usuario;
    }
    
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    leerDatos()
});