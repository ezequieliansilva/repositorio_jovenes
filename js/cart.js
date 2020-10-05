var prodCarrito = [];
var articulos = [];

function convertir(precio , moneda ) {
    if ( moneda != "USD"){
        return parseInt(precio) / 40;
    }
    else
    {
        return parseInt(precio);
    }
};
function printcarritou () {
    let htmlContentToAppend = "";
    let total = 0;
    htmlContentToAppend += `<table class="tg">
    <thead>
      <tr>
        <th class="tg-0lax">Imagen</th>
        <th class="tg-0lax">Nombre</th>
        <th class="tg-0lax">Cantidad</th>
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
        <td class="tg-0lax"><p class="mb-1">`+ unArticulo.count + `</p></td>
        <td class="tg-0lax"><p class="mb-1"> USD `+ convertido + `</p> </td>
        <td class="tg-0lax"><p class="mb-1"> USD `+ convertido * parseInt(unArticulo.count) + `</p></td>
        </tr>`;
      }
        htmlContentToAppend +=`
        <tr>
          <td class="tg-0lax" colspan="5" ><h4  align = "center" > Total a pagar USD `+ total +`</h4></td>
        </tr>
        </tbody>
    </table>`;
    document.getElementById("carrito").innerHTML = htmlContentToAppend;
};
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO2_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            prodCarrito = resultObj.data;
            articulos = prodCarrito.articles;
            printcarritou ();
        }
    });
});