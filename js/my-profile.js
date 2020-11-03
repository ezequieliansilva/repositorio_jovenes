var misDatos = document.getElementsByClassName("myDatos");

function perfil()
{
  if( document.getElementById("fotoDePerfil").src = "")
  {
    document.getElementById("fotoDePerfil").style.display = "block";
  }
  else{
    document.getElementById("fotoDePerfil").style.display = "none";
  }
}

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
    let infoCampos = {
        "nombre1" : document.getElementsByClassName("myDatos")[0].value,
        "nombre2" : document.getElementsByClassName("myDatos")[1].value,
        "apellido1" : document.getElementsByClassName("myDatos")[2].value,
        "apellido2" : document.getElementsByClassName("myDatos")[3].value,
        "email" : document.getElementsByClassName("myDatos")[4].value,
        "telefono": document.getElementsByClassName("myDatos")[5].value,
        "foto": document.getElementsByClassName("myDatos")[6].value,
    }
    localStorage.setItem("infoCampos",JSON.stringify(infoCampos));  
    /*for (let i = 0; i < 7; i++)
    {
        localStorage.setItem("dato"+i, misDatos[i].value.trim()); //setItem almacena el dato en la posición "usuario"
    }
    localStorage.setItem("imagen", misDatos[6].value.trim());*/
    return "Datos guardados exitosamente";
}

function leerDatos(){
    let infoCampos = JSON.parse(localStorage.getItem("infoCampos"));
    document.getElementsByClassName("myDatos")[0].value = infoCampos.nombre1;
    document.getElementsByClassName("myDatos")[1].value = infoCampos.nombre2;
    document.getElementsByClassName("myDatos")[2].value = infoCampos.apellido1;
    document.getElementsByClassName("myDatos")[3].value = infoCampos.apellido2;
    document.getElementsByClassName("myDatos")[4].value = infoCampos.email;
    document.getElementsByClassName("myDatos")[5].value = infoCampos.telefono;
    document.getElementsByClassName("myDatos")[6].value = infoCampos.foto;
    document.getElementById("fotoPerfil").src = infoCampos.foto;
    
    /*for (let i = 0; i < 7; i++)
    {
        document.getElementsByClassName("myDatos")[i].value= localStorage.getItem("dato"+i);
        
    }
    document.getElementsByClassName("myDatos")[7].value= localStorage.getItem("imagen");
    document.getElementById("fotoPerfil").src = localStorage.getItem("imagen");*/
        
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    leerDatos();
    perfil();
});