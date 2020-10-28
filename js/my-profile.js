var misDatos = [];

function verificar()
{
    let conteo = 0;
    for (let i; i < 7 ; i++)
    {
        document.getElementsByClassName("datosDireccion")[i].style.backgroundColor = "white";
    }
    for (let i; i < 7 ; i++)
    {
        if (document.getElementsByClassName("datosDireccion")[i].length < 3 && i != 1 && i != 3)
        {
            document.getElementsByClassName("datosDireccion")[i].style.backgroundColor = "pink";
        }
        else if (document.getElementsByClassName("datosDireccion")[i].length > 2 && i != 1 && i != 3)
        {
            conteo++;
        }

    }
    if (conteo == 5)
    {
        alert ("Datos Guardados exitosamente");

    }
    else {
        alert ("Llene los campos restantes");
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});