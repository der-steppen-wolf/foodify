import * as utils from '../utils/foodify.js';

const searchForm = document.querySelector('#search-recipes-form');
const search = document.querySelector('input');
const results = document.querySelector('#recipes-results');

const recipeCardTemplate = recipeJSON => (
    `
    <div class="card" style="margin: 8px; width: 18rem;">
        <img src="${recipeJSON.recipe.image}" class="card-img-top" alt="${recipeJSON.recipe.label}">
        <div class="card-body">
            <h5 class="card-title">${recipeJSON.recipe.label}</h5>
            <p class="card-text">Ingredients:<br>${recipeJSON.recipe.ingredientLines}</p>
        </div>
    </div>
`);

searchForm.addEventListener('submit', async (e) => {
    // prevent page from refreshing
    e.preventDefault();
    const keyword = search.value;
    
    results.textContent = "Loading ...";
    
    const data = await utils.fetchJSON('https://api.edamam.com/api/recipes/v2?type=public&q=' + keyword + 
    '&app_id=9558fd4e&app_key=b1e4f9a0b4b37de5fc9a063df9653b13');

    results.textContent = '';

    var row = document.createElement("div");
    row.classList.add("row");

    // Get fragment showing search results count
    const resultsCountFragment = utils.getResultsCountFragment(data.hits.length);
    results.appendChild(resultsCountFragment);

    for (let i = 1; i <= data.hits.length; i++) {
        const recipeJSON = data.hits[i - 1];

        // Creates a bootstrap card fragment with the recipe in foodJSON
        const cardFragment = utils.getCardFragment(recipeCardTemplate, recipeJSON);
        row.appendChild(cardFragment);
        
        // For every 3 search results append row and create new row
        if (i % 3 == 0) {
            results.appendChild(row);
            row = document.createElement("div");
            row.classList.add("row");
        } 
        // Add final row
        else if (i == data.hits.length) {
            results.appendChild(row);
        }
    }
});