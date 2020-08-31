var product = {};
var comentaries = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
        
    }
}

function showComentaries(){
    let htmlContentToAppend = "<h3 > Comentarios </h3>";
    for(let i = 0; i < comentaries.length; i++){
        let comentary = comentaries[i];
        let estrella = [];
        for(let ii = 0; ii < 5; ii++){
            if (comentary.score > ii)
            {
                estrella[ii] = "fa fa-star checked";
            }
            else {
                estrella[ii] = "fa fa-star";
            }
        }
        htmlContentToAppend += `
        <div class="row">
                    <div class="col-3">
                        <span class="`+estrella[0]+`"></span>
                        <span class="`+estrella[1]+`"></span>
                        <span class="`+estrella[2]+`"></span>
                        <span class="`+estrella[3]+`"></span>
                        <span class="`+estrella[4]+`"></span>
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ comentary.user +`</h4>
                            <small class="text-muted"> realizado ` +comentary.dateTime+  `</small>
                        </div>
                        <p class="mb-1">`+ comentary.description + `</p>
                     </div>
                </div>
        `

        document.getElementById("comentariosListados").innerHTML = htmlContentToAppend;
        
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("soldCount");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("currency");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML = product.currency;


            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comentaries = resultObj.data;


            //Muestro las imagenes en forma de galería
            showComentaries();
        }
    });
});

//-------------------------------------------------

function comentar()
{
    let comentario = {
        "score": undefined,
        "description": undefined,
        "user": undefined,
        "dateTime": undefined
    };
    comentario.user = localStorage.getItem("usuario");
    comentario.description = document.getElementById("comentario").value;
    comentario.score = document.getElementById("puntaje").value;
    comentario.dateTime = fechaActual();
    comentaries.push(comentario);
    showComentaries()
}

function fechaActual()
{
    var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
var hh = today.getHours();
var minmin = today.getMinutes();
var ss = today.getSeconds();

if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd + " "+hh+ ":"+ minmin + ":"+ ss;
return today;
}