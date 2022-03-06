const fetchJSON = async (url) => {
    var data = '';
    try {
        const response = await fetch(url);
        data = await response.json();
    } catch(error) {
        console.log(error);
    }
    return data;
};

const getResultsCountFragment = (count) => {
    const fragment = document.createDocumentFragment();
    const parser = new DOMParser();

    const newNode = parser.parseFromString(
    `<p style='font-size: 12px;'> ${count} results returned</p>`, 'text/html');
    const els = newNode.documentElement.querySelector('p');

    fragment.appendChild(els);

    return fragment;
};

const getCardFragment = (template, foodJSON) => {
    const fragment = document.createDocumentFragment();
    const parser = new DOMParser();

    const newNode = parser.parseFromString(template(foodJSON), 'text/html');
    const els = newNode.documentElement.querySelector('.card');

    fragment.appendChild(els);
    return fragment;
};

const getDailyCalorieIntake = (age, sex, activityLevel) => {
    var chart;
    if (sex == "female") {
        var chart = new Map([
            ["2-3", [1000, 1000, 1000]],
            ["4-8", [1200, 1400, 1800]],
            ["9-13", [1600, 1600, 2200]],
            ["14-18", [1800, 2000, 2400]],
            ["19-30", [2000, 2000, 2200]],
            ["31-50", [1800, 2000, 2200]],
            ["51+", [1600, 1800, 2200]] 
        ]);
    } else {
        var chart = new Map([
            ["2-3", [1000, 1000, 1000]],
            ["4-8", [1400, 1600, 2000]],
            ["9-13", [1800, 2200, 2600]],
            ["14-18", [2200, 2800, 3200]],
            ["19-30", [2400, 2800, 3000]],
            ["31-50", [2200, 2600, 3000]],
            ["51+", [2000, 2400, 2800]] 
        ]);
    }

    var activityIndex;
    if (activityLevel == "sedentary") {
        activityIndex = 0;
    } else if (activityLevel == "moderate") {
        activityIndex = 1;
    }
    else {
        activityIndex = 2;
    }

    var ageRange;
    if (age >= 2 && age <= 3) {
        ageRange = "2-3";
    } else if (age >= 4 && age <= 8) {
        ageRange = "4-8";
    } else if (age >= 9 && age <= 13) {
        ageRange = "9-13";
    } else if (age >= 14 && age <= 18) {
        ageRange = "14-18";
    } else if (age >= 19 && age <= 30) {
        ageRange = "19-30";
    } else if (age >= 31 && age <= 50) {
        ageRange = "31-50";
    } else {
        ageRange = "51+";
    }

    return chart.get(ageRange)[activityIndex];
};

const createDailyMealPlan = async (dailyIntake) => {
    var totalCal = 0;
    const mealTypes = ['breakfast', 'teatime', 'lunch', 'dinner', 'snack'];
    const breakfastKeywords = ['egg', 'breakfast'];
    const lunchDinnerKeywords = ['pasta', 'meat', 'fish', 'vegetables', 'greens'];
    const snackKeywords = ['fruit', 'snack'];

    for (let i = 0; i < mealTypes.length && totalCal <= dailyIntake; i++) {
        var keyword;
        
        if (mealTypes[i] == 'breakfast') {
            const random = Math.floor(Math.random() * breakfastKeywords.length);
            keyword = breakfastKeywords[random];
        } else if (mealTypes[i] == 'lunch' || mealTypes[i] == 'dinner') {
            const random = Math.floor(Math.random() * lunchDinnerKeywords.length);
            keyword = lunchDinnerKeywords[random];
        }
        else {
            const random = Math.floor(Math.random() * snackKeywords.length);
            keyword = snackKeywords[random];
        }

        var calories = 0;
        while(true) {
            await fetch('https://api.edamam.com/api/recipes/v2?type=public&q=' + keyword + 
            '&app_id=9558fd4e&app_key=b1e4f9a0b4b37de5fc9a063df9653b13&mealType=' + mealTypes[i]).then((response) => {
                response.json().then((data) => {
                    const random = Math.floor(Math.random() * data.hits.length);
                    calories = data.hits[random].recipe.calories;
                    totalCal += calories;
                });
            });

            if (totalCal > dailyIntake) {
                totalCal -= calories;
            }
            else {
                break;
            }
        }
    }
    console.log(totalCal)
};

export {getDailyCalorieIntake, createDailyMealPlan, fetchJSON, getResultsCountFragment, getCardFragment};