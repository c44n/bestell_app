let allMeals = meals;


function init(){
    loadMeals();
}

function loadMeals(){
    let mealsSectionRef = document.getElementById('allMeals');

    for(let i = 0; i < allMeals.length ; i++){
        id = i;
        
        mealsSectionRef.innerHTML += allMealsTemplate(allMeals[i], id);
    }
    
}