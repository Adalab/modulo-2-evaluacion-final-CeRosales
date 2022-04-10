'use strict';


/*La aplicación de búsqueda de cócteles consta de dos partes:
. Un campo de texto y un botón para buscar un cóctel por su título.
. Un listado de resultados de búsqueda donde aparece la imagen del cóctel y el nombre.*/



const searchButton = document.querySelector('.js-buttonSearch');
const list = document.querySelector('.js-list');
const input = document.querySelector('.js-input');

      

let info = [];
                                                    


    //pinto 
    
function paintHTML(info) {
    let html = '';

    for (const drink of info) {
    let classFavorite = '';
        
    const favoriteFoundIndex = favorites.findIndex(fav=>{
        return fav.idDrink === drink.id;
    });

    if(favoriteFoundIndex !== -1){
        classFavorite = 'color-favorite'
    }else {
        classFavorite ='';
    };

    html += `<li class='js-drinks li ${classFavorite}' id=${drink.idDrink}>`;
    html += `<img class='imagen' src=${drink.strDrinkThumb}>`;
    html += `<h2 class ='h2'>${drink.strDrink}</h2>`;
    html +=`</div>`;
    html += `</li>`;
            //falta cerrar div y li
    }

    list.innerHTML = html;
    listenerCocktails();
      
      //listener de las bebidas cuando acabo de pintar
};

   
    
    


// favoritos 

//almacenaje en localstorage
// reset
// ev intermedia

    

//concatenar APIS
// añadir imagen cuando no hay imagen




//escuchar evento fav

let favorites = [];



function handleClickDrink(event){
    console.log(event.currentTarget.id);
    const idDrinks = event.currentTarget.id;
   
    const favoriteFound = info.find(fav =>{
        return fav.idDrink === idDrinks;
    });

    const favoriteFoundIndex = favorites.findIndex(fav=>{
        return fav.idDrink === idDrinks;
    });

    if (favoriteFoundIndex === -1) {
        favorites.push(favoriteFound);
        //agregar clase

    }else { //eliminar drink de fav
        favorites.splice(favoriteFoundIndex, 1);
    } 
    paintHTML();
    console.log(favorites);
};



function listenerCocktails() {
const liBebidas = document.querySelectorAll('.js-drinks');
for (const item of liBebidas) {
    item.addEventListener('click', handleClickDrink)
        
}};








//filtrar

function handleInput(event) {
    event.preventDefault();
    const filterValue = input.value ;
    const listFilter = info.filter(palette => {
        return palette.strDrink.toLowerCase().includes(filterValue.toLowerCase());
    });
   
    paintHTML(listFilter);
}

input.addEventListener('keyup', handleInput);




//está en localstorage?

const listFilterStorage = JSON.parse(localStorage.getItem('listaBebidas'));

if(listFilterStorage !== null) {
    info = listFilterStorage;
    paintHTML(info);

}else {
     let inputName = input.value;
     fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputName}')
    .then((response) => response.json())
    .then((cocktailData) => { 
        console.log(cocktailData);
        info = cocktailData.drinks;
        localStorage.setItem('listaBebidas', JSON.stringify(info))
        paintHTML(info);
       
    });
   
    };

