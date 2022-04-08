'use strict';


/*La aplicación de búsqueda de cócteles consta de dos partes:
. Un campo de texto y un botón para buscar un cóctel por su título.
. Un listado de resultados de búsqueda donde aparece la imagen del cóctel y el nombre.*/



const searchButton = document.querySelector('.js-buttonSearch');
const list = document.querySelector('.js-list');
const input = document.querySelector('.js-input');


/*function getCocktails(event) {
  event.preventDefault();
  fetch('https://www.thecocktaildb.com/', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((cardData) => {
      console.log(cardData);
    });


    searchButton.addEventListener('click', getCocktails) ;*/

    
    let info = [];

    function paintHTML() {
    let html = '';
       for (const drink of info) {
        html += `<li>${drink.strDrink}</li>`   
       }
      list.innerHTML = html;
    }

   
// filtrar elementos 
// favoritos
// localStorage
// ev intermedia

// B reset
// maquetar
    

    function getCocktails() {
     fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then((response) => response.json())
    .then((cocktailData) => { 
        console.log(cocktailData);
        info = cocktailData.drinks;
        paintHTML();
    });
    };



    
    searchButton.addEventListener('click', getCocktails);

    

