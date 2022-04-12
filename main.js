'use strict';



const searchButton = document.querySelector('.js-buttonSearch');
const list = document.querySelector('.js-list');
const input = document.querySelector('.js-input');
const favList = document.querySelector('.js-favList');
const reset = document.querySelector('.js-buttonReset');
const buttonLog = document.querySelector('.js-buttonLog');    

//Al hacer clic sobre el botón LOG hay que pintar en la consola ‘Tienes X favoritos’ (número de favs). Al ser posible accediendo al array para leer el número de favs, no al DOM.







let info = [];
                                                    

// por si me faltan imagenes en la API
function drinkThumbPlaceholder(){
  for (const drink of info) {
    if(drink.strDrinkThumb === ''){
      drink.strDrinkThumb = "https://via.placeholder.com/210x295/ffffff/666666/?text=Cocktail"
    }
  }
};




//Si el cóctel tiene 4 ingredientes o más que pinte el cuarto  ingrediente también


//pinto 
    
function paintHTML() {
    let html = '';



    for (const drink of info) {
    let classFavorite = '';
        
    const favoriteFoundIndex = favorites.findIndex(fav=>{
        return fav.idDrink === drink.idDrink;
    });

    if(favoriteFoundIndex !== -1){
        classFavorite = 'color-favorite'
    }else {
        classFavorite ='';
    }

   

   
    html += `<li class='js-drink li ${classFavorite}' id=${drink.idDrink}>`;
    html += `<img class='imagen' src=${drink.strDrinkThumb}>`;
    html += `<h2 class ='h2'>${drink.strDrink}</h2>`;
    html += `<h3 class='h3'>${drink.strIngredient1} ${drink.strIngredient2} ${drink.strIngredient3}</h3>`;
    if (drink.strIngredient4 !== null) {
       html += `<h3>${drink.strIngredient4}</h3>`
    };
    html +=`</div>`;
    html += `</li>`;
            
    }

    list.innerHTML = html;
    drinkclickListener();
    paintFavs();


      

};

//listener de las bebidas cuando hace click en cada cocktail

    function drinkclickListener() {
      const liCocktail =document.querySelectorAll('.js-drink');
      for (const drink of liCocktail ) {
        drink.addEventListener('click', handleClickDrink);
      }
    };




    
//array para favs +   pintar

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
    saveInLocal();
};

//pinto los favs

function paintFavs() {
  let html = '';
  for (const drink of favorites) {
    let classFav = '';
    const favoriteFoundIndex = favorites.findIndex((fav) =>{
      return fav.idDrink === drink.idDrink;
    });
    if (favoriteFoundIndex !== -1) {
      classFav = 'class-favorite';
    } else {
      classFav = '';
    }
    html += `<li class='js-drinks li ${classFav}' id=${drink.idDrink} >`;
    html += `<img class='imagen' src=${drink.strDrinkThumb}>`;
    html += `<h2 class ='h2'>${drink.strDrink}</h2>`;
    html +=`</div>`;
    html += `</li>`;

  }
  favList.innerHTML = html;
  saveInLocal();
};






//filtrar cocktails 

function handleInput(event) {
    event.preventDefault();
    const searchedDrink= input.value.toLowerCase() ;
    fetchCall(searchedDrink);
}

searchButton.addEventListener('click', handleInput);




// traigo datos de la API


function fetchCall(searchedDrink) {
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchedDrink}`
  )
    .then((response) => response.json())
    .then((data) => {
      info = data.drinks;
      drinkThumbPlaceholder();
      paintHTML();
    });
}


//reset

function handleReset(event) {
  event.preventDefault();
  favorites.splice(0, favorites.length);
  input.value = '';
  info = [];
  paintHTML();
}

reset.addEventListener('click', handleReset);



// localstorage

//que funcione con fav

function saveFromLocal() {

const localStorageDrinks = localStorage.getItem("favorites");

if(localStorageDrinks !== null) {
    const saveFavs = JSON.parse(localStorageDrinks);
    favorites = saveFavs;
    paintFavs();

}

};


function saveInLocal() {
  const stringifyFav = JSON.stringify(favorites);
  localStorage.setItem("favorites", stringifyFav)
}

saveFromLocal();


//Añadir a las tarjetas de resultados 3 ingredientes del cóctel  (strIngredient1, strIngredient2, strIngredient3).



function handleFavX() {
  console.log('Tienes')
  console.log(favorites.length);
  console.log('favs');
}


buttonLog.addEventListener('click', handleFavX );
