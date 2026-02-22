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

function addMealToBasket(meal_category_id, meal_id){
    let basketRef = document.getElementById('basket__mealList');
    let mealInfo = meals[meal_category_id].meals[meal_id];

    let basketWrapperRef = document.getElementById('basket__mealList');

    //console.log(cRef);

    if(basketWrapperRef.querySelector('[data-meal_id="'+meal_id+'"]')) {
        let mealCountRef = document.getElementById('meal_count_'+meal_id);

        countRef = parseInt(mealCountRef.innerText); //parseInt wandelt Textinhalt in Ganzzahl um
    
        mealCountRef.innerHTML = countRef+1;
    } else {
        basketRef.innerHTML += mealToBasketTemplate(mealInfo, meal_id);
    }

    
}