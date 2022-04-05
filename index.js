//$("#getCodeModal").click('show');

// $(document).on('change','.form-check-input' ,function(e) {
//     if(this.checked){
//      console.log($('.form-check-input').val(this.value));
//     } 
    
// });
var opcion;
$("input[name=flexRadioDefault]").change(function () {	 
    opcion = ($(this).val());
    console.log(opcion)
    });


function buscar_variantes_trago(trago_name){
    // www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
    $.ajax({
        async: false,
        type: "GET",
        url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + trago_name,
        Headers: {
            'Access-Control-Allow-Origin': '*',
        },
        dataType: "json",

        success: function(especialidades){
            //console.log("Entre a variantes tragos: "+trago_name);
            nombres_especialidades=[];  //un arr vacio
            // especialidades.drinks es un array. puede tener el mismo trago (length 1) o puede tener mas variedades

            if(especialidades.drinks.length >1){
                especialidades.drinks.forEach(element => {
                    nombres_especialidades.push(element);
                });
            }
            else{
                nombres_especialidades.push("No Existen mas variedades")
            }
            //retorna mi array
            console.log("lo muestro aca: ", nombres_especialidades);
            return nombres_especialidades
        }
    })

}

function buscar(letra) {
    console.log("estoy en buscar tragos con letra " + letra)

    $.ajax({
        type: "GET",
        url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + letra,
        Headers: {
            'Access-Control-Allow-Origin': '*',
        },
        dataType: "json",

        success: function (datos) {
            var selector = $("#selector").html("");   //reinicia el contenido
            var container = $("#contenedor").html("");
            // var opcion = document.querySelectorAll('input[type=radio]:checked')
            // console.log(opcion)

            // console.log(datos.drinks)
            //RECORRIENDO ELEMENTOS DE DATOS. Y MOSTRANDO EN UNA CARDS

            console.log(opcion)
            var opcionTrago;
            if(opcion == 1){
                opcionTrago = "Alcoholic"
            }else if(opcion == 2){
                opcionTrago = "Non alcoholic"
            }else{
                opcionTrago = "todos"
            }

            datos.drinks.forEach((element, indice) => {

                if( (opcionTrago == element.strAlcoholic) || opcionTrago == "todos"){
                // console.log(element.strDrink)
                console.log("entre a mostrar")
                console.log(element)
                selector.append(`
                    <option>${element.strDrink}</option>
                `)

                var lista =""
                if(element.strIngredient1  != null){
                    lista = lista + "<li>"+element.strIngredient1+"</li>"
                }
                if(element.strIngredient2 != null){
                    lista = lista + "<li>"+element.strIngredient2+"</li>"
                }
                if(element.strIngredient3 != null){
                    lista = lista + "<li>"+element.strIngredient3+"</li>"
                }
                if(element.strIngredient4 != null){
                    lista = lista + "<li>"+element.strIngredient4+"</li>"
                }
                if(element.strIngredient5 != null){
                    lista = lista + "<li>"+element.strIngredient5+"</li>"
                }
                if(element.strIngredient6 != null){
                    lista = lista + "<li>"+element.strIngredient6+"</li>"
                }
                if(element.strIngredient7 != null){
                    lista = lista + "<li>"+element.strIngredient7+"</li>"
                }
                if(element.strIngredient8 != null){
                    lista = lista + "<li>"+element.strIngredient8+"</li>"
                }
                if(element.strIngredient9 != null){
                    lista = lista + "<li>"+element.strIngredient9+"</li>"
                }
                if(element.strIngredient10 != null){
                    lista = lista + "<li>"+element.strIngredient10+"</li>"
                }

                //aca ya tengo el nombre del trago que es element.strDrink  Ej: Margarita. No siempre los tragos tienen variantes
                $.ajax({
                    type: "GET",
                    url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + element.strDrink,
                    Headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    dataType: "json",
            
                    success: function(especialidades){
                        //console.log("Entre a variantes tragos: "+trago_name);
                        let nombres_especialidades = [];  //un arr vacio
                        // especialidades.drinks es un array. puede tener el mismo trago (length 1) o puede tener mas variedades
            
                        if(especialidades.drinks.length>1){
                            especialidades.drinks.forEach(element => {
                                nombres_especialidades.push(element);
                            });
                        }
                        else{
                            nombres_especialidades.push("No Existen mas variedades")
                        }
                        //retorna mi array
                        // console.log("lo muestro aca: ", nombres_especialidades);
                        var lista_2 =""; //inicializa
                        
                        for(i=0;i<nombres_especialidades.length;i++){
                            // console.log("el largo es : ", nombres_especialidades.length);
                            if(nombres_especialidades.length>1){
                                lista_2 = lista_2 + "<li>"+nombres_especialidades[i].strDrink+"</li>"
                            }
                            else{
                                lista_2 = lista_2 + "<li>"+nombres_especialidades+"</li>"
                            }
                            
                            // console.log("holaaaa", nombres_especialidades[i]);
                        }
                        // console.log("hola" ,lista_2);

                        container.append(`
                
                        <div class="card" style="width: 16rem; display: inline-block;">
                        <img src="${element.strDrinkThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                         <p class="card-text">${element.strDrink}</p>
    
                         <!-- Button trigger modal -->
                         <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop${indice}">
                           Mostrar Datos de Trago
                         </button>
                         
                         <!-- Modal -->
                         <div class="modal fade" id="staticBackdrop${indice}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                           <div class="modal-dialog">
                             <div class="modal-content">
                               <div class="modal-header">
                                 <h5 class="modal-title" id="staticBackdropLabel">${element.strDrink}</h5>
                                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                               </div>
                               <div class="modal-body">
                               <img src="${element.strDrinkThumb}" class="card-img-top w-50" alt="...">
                               <hr>
    
                                <h4>Ingredientes</h4>                                                  
                                <ol>
                                    ${lista}
                                </ol>
                                <h4>Variantes mas Relevantes</h4>                                                  
                                <ol>
                                    ${lista_2}
                                </ol>
                               <hr>
                               <h4>Preparacion</h4>
                               <p>${element.strInstructions}</p>
                               </div>
                               <div class="modal-footer">
                                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                 
                               </div>
                             </div>
                           </div>
                         </div>
                         
                         </div>
                        </div>                
                    `)        
                    
                    }
                    })

              }
            });
        },
        error: function (error) {
            console.log(error)
        }
    })
}


function cargarDatos(urlPaso1, letra) {
    console.log("estoy mostrando tragos con letra " + letra)
    $.ajax({
        type: "GET",
        url: urlPaso1,
        Headers: {
            'Access-Control-Allow-Origin': '*',
        },
        dataType: "json",

        success: function (datos) {

            console.log(datos.drinks[0].strDrink)


        },
        error: function (error) {
            console.log(error)
        }
    })
}

var letrasArray = ["a", "b", "c", "d", "e", "f"];

// letrasArray.forEach(element => {
//     console.log(element)
//     var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f="+element;

//     cargarDatos(url, element)   







//cargarDatos("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a", "A")

//cargarDatos("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b", "B")