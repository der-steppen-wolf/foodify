import { getDailyCalorieIntake, createDailyMealPlan } from '../utils/foodify.js';

const mealPlanForm = document.querySelector('#meal-plan-form');
const results = document.querySelector('#results');

mealPlanForm.addEventListener('submit', (e) => {
    // prevent page from refreshing
    e.preventDefault();

    const intake = document.querySelector('#daily-intake');

    const age = document.querySelector('#age').value;
    if (age >=2 && age <= 120) {
        const sex = document.querySelector('input[name="sex"]:checked');
        const selectElem = document.querySelector('#lifestyle');
        const lifestyle = selectElem.options[selectElem.selectedIndex].text;

        const dailyIntake = getDailyCalorieIntake(age, sex, lifestyle);
        intake.innerHTML = "Daily Calorie Intake: " + dailyIntake;
    } else {
        alert("Enter a valid age.");
    }
});