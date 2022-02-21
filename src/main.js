// import { TypeFilter, RegionFilter } from './data.js';
// importacion data y funciones data.js
import data from './data/pokemon/pokemon.js';
import * as dataFunctions from './data.js';

window.onload = () => {
    // declaracion variables uso global
    let completeDataSet = data.pokemon;
    
    // declaracion variable card para seccion tarjetas
    let card = document.querySelector('.section-cards');
    
    // funcion para crear tarjetas
    function createCards(datasetToUse){
        let renderString = "";
        // ciclo for para crear tarjetas
        for(let pokemonCharacter of datasetToUse){
        //console.log(pokemonCharacter);
        let cardStructure =
            `<article class="card">
                <p class="card__id">${pokemonCharacter.num}</p>
                <figure class="card__character">
                    <img class="card__image" src="${pokemonCharacter.img}" alt="character card">
                </figure>
                <article class="card__content">
                    <h3 class="card__name">${pokemonCharacter.name}</h3>
                    <p class="card__type">Type: ${pokemonCharacter.type.join(" ")}</p>
                </article>
            </article>`
            renderString += cardStructure;
        }
        card.innerHTML = renderString;        
    }
    
    // llamado funcion para crear tarjetas en html
    createCards(completeDataSet)

    // declaracion objeto filtros segun HU3
    let filters = {
        "type":[],
        // "resistant":[],
        // "weaknesses":[]
    }

    // funcion para concatenar dos arrays sin repetir elementos dentro de uno de ellos
    function addElementsToArray(array1, array2){
        array2.forEach(item => {
            if(!array1.includes(item)){
                array1.push(item);
            }
        }); 
        return array1
    }
    
    // funcion para agregar y ordenar los elementos al objeto de filtros 
    // y cada uno de sus array
    function createFilters(datasetToUse){
        // ciclo para recorrer todos los elementos de datasetToUse y obtener filtros
        for(let pokemonCharacter of datasetToUse){
            // obtiene elementos(tipos-resistencia-debilidad) 
            // para cada seccion de filtros
            Object.keys(filters).forEach(filterKey => {
                // console.log(filters[filterKey], pokemonCharacter[filterKey],pokemonCharacter.name);
                filters[filterKey] = 
                addElementsToArray(filters[filterKey], pokemonCharacter[filterKey])
            })
        }
        // console.log(Object.keys(filters));
        // console.log(filters);

        // organiza los elementos de cada seccion de filtro por orden alfabetico
        Object.keys(filters).forEach(filterKey => {
            // console.log(filters[filterKey]);
            filters[filterKey].sort(function (a, b) {
                // console.log(a.localeCompare(b));
                return a.localeCompare(b);
            }); 
            // return filters[filterKey].sort()
        }) 
    }

    // llamando funcion para agregar elementos a objeto filters
    createFilters(completeDataSet)
    
    // declaracion variable filterSection para seccion filtros
    let filterSection = document.querySelector('.aside-filter');

    // declaracion filterStructure vacia para crear estructura html
    let filterStructure = "";

    // funcion para crear estructura de filtros en html 
    function createFiltersStructure(filters){
        // ciclo para crear las secciones de filtros de acuerdo 
        // a caracteristicas establecidas
        for(let[listkey, listValues] of Object.entries(filters)){
            // console.log(listkey, listValues);
            let values = "";
            listValues.forEach((value,index)=>{
                // console.log(value,index);
                values+=
                `<li>
                    <input type="checkbox" class="filter__check" 
                        value="${value}" id="${listkey}${index}" >
                    <label for="${listkey}${index}">${value}</label>
                </li>
                `
            })
            // crea estructura de cada seccion de filtro
            filterStructure+=
            `<section class="filter__item">
                <h2>Filter by:</h2>
                <h3>${listkey}</h3>
                <ul>
                    ${values}
                </ul>
            </section>`
        }
        // inserta estructura filtros
        filterSection.innerHTML = filterStructure;
    }
    
    // llamado funcion para crear estructura de filtros en html 
    createFiltersStructure(filters)

    // declaracion filterCheck para controlar el evento de check
    let filterCheck = document.querySelectorAll('.filter__check');
    // console.log(filterCheck);   

    // ciclo para encontrar los filtros a los que se les aplica check 
    filterCheck.forEach((checkBox)=>{
        // console.log(element)
        checkBox.onchange = (event) => {
            let filteredPokemonsResult = dataFunctions.filterHandler(event.target.value,event.target.checked);
            createCards(filteredPokemonsResult);
            // console.log(event.target.value, event.target.checked)
            // console.log(filteredPokemons.length)
        };
    })
}





