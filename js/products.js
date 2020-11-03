const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_COST = "Cost up";
const ORDER_ASC_BY_COST = "Cost down";
const ORDER_ASC_BY_SOLDOUT = "Sold up";
const ORDER_DESC_BY_SOLDOUT = "Sold down";
var currentProducsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var buscador = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_COST){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_COST){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }else if (criteria ===  ORDER_ASC_BY_SOLDOUT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria ===  ORDER_DESC_BY_SOLDOUT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){

    let htmlContentToAppend = `<div class="container">
    <div class="row">`;
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)) &&
            ((buscador == undefined) || (buscador != undefined && (product.name.toLowerCase().includes(buscador.toLowerCase()) ||
            (product.description.toLowerCase().includes(buscador.toLowerCase())))))){
                htmlContentToAppend += `<div class="col">
                <a href="product-info.html" class="list-group-item list-group-item-action">
                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                <h4 class="mb-1">`+ product.name +`</h4>
                <p class="mb-1">`+ product.description + `</p>
                <p class="mb-1">`+  product.currency+` ` + product.cost + `</p>
                <small class="text-muted"> Vendidos ` +product.soldCount+  `</small>
                </div>`

            /*htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted"> Vendidos ` +product.soldCount+  `</small>
                        </div>
                        <p class="mb-1">`+ product.description + `</p>
                        <p class="mb-1">`+  product.currency+` ` + product.cost + `</p>
                     </div>
                </div>
            </a>
            `*/
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
    htmlContentToAppend += `</div></div>`
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los Productos ordenadas
    showProductsList();
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_COST);
    });

    document.getElementById("sortByCountDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortBySoldAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_SOLDOUT);
    });

    document.getElementById("sortBySoldDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_SOLDOUT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;
        buscador = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });


});

document.getElementById("detective").addEventListener("keyup", function(){
    buscar();
});

function buscar()
{
    buscador = document.getElementById("detective").value;
    showProductsList();
}