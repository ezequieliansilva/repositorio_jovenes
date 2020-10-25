var prodCarrito = [];
var articulos = [];
var porEnvio = 5;
var envioValido = false;

function cambioBan()
{
  document.getElementById("datosBancoDiv").style.display = "block";
  for (let i = 0; i < 3 ; i++)
  {
    document.getElementById("datosCredito").style.display = "none";
  }
}

function cambioTar()
{
  document.getElementById("datosBancoDiv").style.display = "none";
  for (let i = 0; i < 3 ; i++)
  {
    document.getElementById("datosCredito").style.display = "block";
  }
}

function guardarDatos()
{

  let conteo = 0;
  document.getElementById("datosBanco").style.backgroundColor = "white";
  for(let i = 0;i<3;i++)
  {
    document.getElementsByClassName("datosCredito")[i].style.backgroundColor = "white";
    document.getElementsByClassName("datosDireccion")[i].style.backgroundColor = "white";
  }
  if ( document.getElementById("transBanRadio").checked)
  {
    if(document.getElementById("datosBanco").value.length > 3)
    {
        conteo++;
    }
    else {
      document.getElementById("datosBanco").style.backgroundColor = "pink";
    }
    for(let i = 0;i<3;i++)
    {
      if(document.getElementsByClassName("datosDireccion")[i].value.length > 3)
      {
        conteo++;
      }
      else {
        document.getElementsByClassName("datosDireccion")[i].style.backgroundColor = "pink";
      }

    }
    if(conteo == 4)
    {
      alert ("Sus datos se guararon exitosamente");
      envioValido = true;
    }
    else {
      alert ("Ingrese los campos faltantes");
      envioValido = false;
    }
  }
  if ( document.getElementById("tarCreRadio").checked)
  {
    for(let i = 0;i<3;i++)
    {
      if(document.getElementsByClassName("datosCredito")[i].value.length > 3)
      {
        conteo++;
      }
      else {
        document.getElementsByClassName("datosCredito")[i].style.backgroundColor = "pink";
      }
    }
    for(let i = 0;i<3;i++)
    {
      if(document.getElementsByClassName("datosDireccion")[i].value.length > 3)
      {
        conteo++;
      }
      else {
        document.getElementsByClassName("datosDireccion")[i].style.backgroundColor = "pink";
      }
    }
    if(conteo == 6)
    {
      alert ("Sus datos se guararon exitosamente");
      envioValido = true;
    }
    else {
      alert ("Ingrese los campos faltantes");
      envioValido = false;
    }
  }
}


function convertir(precio , moneda ) {
    if ( moneda != "USD"){
        return parseInt(precio) / 40;
    }
    else
    {
        return parseInt(precio);
    }
};

function porcentaje(total)
{
  let totalConPorcentaje = 0;
  totalConPorcentaje = total/100*porEnvio;
  return totalConPorcentaje;
}

function recalcular(i , n)
{
    articulos[i].count += n - 2;

  printcarritou ();

  /*let  cantidades = getElementsByClassName("cantidadProducto").array;
  let precios = getElementsByClassName("precio").array;
  let total = 0;
  getElementsByClassName("precioFinal").innerHTML.forEach(element => {
    getElementsByClassName("precioFinal").innerHTML[index] =  parseInt(cantidades[index]) * parseInt(precios[index]);
    total += parseInt(cantidades[index]) * parseInt(precios[index]);
  });
  getElementById("total").innerHTML = total;*/

}

function envio(){
  if(envioValido)
  {
    alert("Su pedido será enviado");
  }
  else
  {
    alert("No hay datos suficientes para cobrarle o enviarle su pedido");
  }
}

function borrar(i)
{
  articulos.splice(i,1);
  printcarritou ();
}

function printcarritou () {
    let htmlContentToAppend = "";
    let total = 0;
    htmlContentToAppend += `<table class="tg">
    <thead>
      <tr>
        <th class="tg-0lax">Imagen</th>
        <th class="tg-0lax">Nombre</th>
        <th class="tg-0lax">Cantidad    </th>
        <th class="tg-0lax">Precio unitario</th>
        <th class="tg-0lax">Precio Total</th>
      </tr>
    </thead>
    <tbody>`;
      for(let i = 0; i < articulos.length; i++){ 
        let unArticulo = articulos[i];
        let convertido = convertir(unArticulo.unitCost , unArticulo.currency);

        total += convertido* parseInt(unArticulo.count);
        htmlContentToAppend += `
      <tr>
        <td class="tg-0lax"><img class="img-fluid img-thumbnail" src="`+ unArticulo.src + `" alt=""></td>
        <td class="tg-0lax"><p class="mb-1">`+ unArticulo.name + `</p></td>
        <td class="tg-0lax"><h4 class="mb-1">`+ unArticulo.count +`<button  class="btn btn-primary" onclick ="recalcular(`+ i+`,3)">↑</button><button  class="btn btn-primary" onclick ="recalcular(`+ i+`,1)">↓</button> </h4></td>
        <td class="tg-0lax"><p class="mb-1" class ="precio"> USD `+ convertido + `</p> </td>
        <td class="tg-0lax"><p class="mb-1"> USD <span class = "precioFinal">`+ convertido * unArticulo.count +`</span></p></td>
        <td class="tg-0lax"><p class="mb-1"> <button class="btn btn-primary" onclick = borrar(`+i+`) >Borrar</button></td>
        </tr>`;
        /*htmlContentToAppend += `
      <tr>
        <td class="tg-0lax"><img class="img-fluid img-thumbnail" src="`+ unArticulo.src + `" alt=""></td>
        <td class="tg-0lax"><p class="mb-1">`+ unArticulo.name + `</p></td>
        <td class="tg-0lax"><p class="mb-1"><input type ="number" class ="cantidadProducto" onchange = "recalcular()" min ="0" max ="10" value ="`+ unArticulo.count +`"></p></td>
        <td class="tg-0lax"><p class="mb-1" class ="precio"> USD `+ convertido + `</p> </td>
        <td class="tg-0lax"><p class="mb-1"> USD <span class = "precioFinal">`+ convertido * unArticulo.count +`</span></p></td>
        </tr>`;*/
      }
        htmlContentToAppend +=`
        <tr >
          <td class="tg-0lax" colspan="5" ><h4  align = "center">Subtotal USD `+ total +`</h4></td>
        </tr>
        <tr >
          <td class="tg-0lax" colspan="5" ><h4  align = "center">Costo envio USD `+ porcentaje(total) +`
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Metodo de pago y envio
            </button></h4>
          </td>
        </tr>
        <tr>
          <td class="tg-0lax" colspan="5" ><h4  align = "center" id = "total" > Total a pagar USD `+ parseInt(porcentaje(total)+total) +`
          
            
             <button class = "btn btn-secondary" onclick ="envio()">Comprar y enviar</button>         
            </h4></td>
        </tr>
        </tbody>
        
    </table>`;
    document.getElementById("carrito").innerHTML = htmlContentToAppend;
};
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    cambioBan()
    getJSONData(CART_INFO2_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            prodCarrito = resultObj.data;
            articulos = prodCarrito.articles;
            printcarritou ();
        }
    });
});