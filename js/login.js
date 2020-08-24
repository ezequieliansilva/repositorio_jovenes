var modal = document.getElementById("tvesModal");
  var body = document.getElementsByTagName("body")[0];
  var login = document.getElementsByName("login")[0];
  var password = document.getElementsByName("password")[0];
  var btnAcceder = document.getElementById("btnAcceder");
  var siteHeader = document.getElementsByClassName("site-header")[0];

  abrir = function() {
    modal.style.display = "block";
    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden";
    siteHeader.style.position = "static";
    siteHeader.style.height = "100%";
    siteHeader.style.overflow = "hidden"; 
  }
  
  btnAcceder.onclick = function() {

      if (document.getElementsByName("login")[0].value.length !== 0 && document.getElementsByName("password")[0].value.length !== 0){
          
      modal.style.display = "none";
      body.style.position = "inherit";
      body.style.height = "auto";
      body.style.overflow = "visible";
      siteHeader.style.position = "inherit";
      siteHeader.style.height = "auto";
      siteHeader.style.overflow = "visible";
      guardar(login.value,password.value);
      }
      else {
          alert("Debe ingresar sus datos");
      };
  }  

function guardar(dato, pass){ 

    if (dato.trim()==="" || pass.trim()===""){ //Chequea que el dato recibido no esté vacío. 
    //El método trim elimina los espacios en blanco al inicio y al final del mismo.
        alert("El dato está vacío");
    }    else{
    localStorage.setItem("usuario", dato.trim()); //setItem almacena el dato en la posición "usuario"
    localStorage.setItem("password", pass.trim()); // Almaceno la contraseña
    sessionStorage.setItem("usuario", dato.trim());
    alert (" Usuario : " + dato + " Password : " + pass ); 
    leer();
    //getItem obtiene el dato almacenado en la posición "usuario"

    
   
    }
}

function leer(){
    var usuario = localStorage.getItem("usuario"); //getItem Obtiene el dato de la posición "usuario"
    var sesion = sessionStorage.getItem("usuario");
    document.getElementById('user').innerHTML=usuario;
}

document.addEventListener("DOMContentLoaded", function(e){
    if(localStorage.getItem("usuario").length > 0){
        leer();
    }
    else {
        document.getElementById('user').innerHTML="Sin iniciar sesion";
    }
});