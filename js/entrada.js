
  var modal = document.getElementById("tvesModal");
  var body = document.getElementsByTagName("body")[0];
  var login = document.getElementsByName("login")[0];
  var password = document.getElementsByName("password")[0];
  var btnAcceder = document.getElementById("btnAcceder");
  var siteHeader = document.getElementsByClassName("site-header")[0];
  
  btnAcceder.onclick = function() {

      if (document.getElementsByName("login")[0].value.length !== 0 && document.getElementsByName("password")[0].value.length !== 0){
          
      modal.style.display = "none";
      body.style.position = "inherit";
      body.style.height = "auto";
      body.style.overflow = "visible";
      siteHeader.style.position = "inherit";
      siteHeader.style.height = "auto";
      siteHeader.style.overflow = "visible";
      }
      else {
          alert("Debe ingresar sus datos");
      };
  }  

document.addEventListener("DOMContentLoaded", function(e){
    modal.style.display = "block";
    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden";
    siteHeader.style.position = "static";
    siteHeader.style.height = "100%";
    siteHeader.style.overflow = "hidden";
});