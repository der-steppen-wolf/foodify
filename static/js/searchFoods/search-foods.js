import * as utils from '../utils/foodify.js';

const searchForm = document.querySelector('#search-food-form');
const search = document.querySelector('input');
const results = document.querySelector('#food-results');

const foodCardTemplate = foodJSON => (
    `
    <div class="card" style="margin: 8px; width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${foodJSON.food.label}</h5>
            <p class="card-text">
                Calories: ${foodJSON.food.nutrients.ENERC_KCAL}
                <br>Carbs: ${foodJSON.food.nutrients.CHOCDF}
                <br>Fat:  ${foodJSON.food.nutrients.FAT}
                <br>Fiber: ${foodJSON.food.nutrients.FIBTG}
                <br>Protein: ${foodJSON.food.nutrients.PROCNT}
            </p>
        </div>
    </div>
`);

searchForm.addEventListener('submit', async (e) => {
    // prevent page from refreshing
    e.preventDefault();
    
    results.textContent = "Loading ...";

    const data = await utils.fetchJSON('https://api.edamam.com/api/food-database/v2/'+
    'parser?app_id=04d9c918&app_key=6ff2a9d2abb9895646ef66f711801662&ingr=' + search.value);
    
    results.textContent = '';
    
    // Get fragment showing search results count
    const resultsCountFragment = utils.getResultsCountFragment(data.hints.length);
    results.appendChild(resultsCountFragment);

    var row = document.createElement("div");
    row.classList.add("row");

    for (let i = 1; i <= data.hints.length; i++) {
        const foodJSON = data.hints[i - 1];

        // Creates a bootstrap card fragment with the food item in foodJSON
        const cardFragment = utils.getCardFragment(foodCardTemplate, foodJSON);
        row.appendChild(cardFragment);

        // For every 3 search results append row and create new row
        if (i % 3 == 0) {
            results.appendChild(row);
            row = document.createElement("div");
            row.classList.add("row");
        }
        // Add final row
        else if (i == data.hints.length) {
            results.appendChild(row);
        }
    }
});