function allMealsTemplate(meals, id) {
    let mealList = "";
    for (i = 0; i < meals.meals.length; i++) {
        let meal = meals.meals[i];
        let meal_category_id = id;
        let meal_id = i;
        mealList += mealContentTemplate(meal, meal_category_id, meal_id);
    }

    return `
        ${mealTitleTemplate(meals)}

        <div class="container_xl">
            ${mealList}
    `;
}

function mealTitleTemplate(meals) {
    return `
        <div class="meal__title bg-primary">
            <div class="container_title">
                <div class="meal__title_wrapper">
                    <img src="${meals.icon}" alt="Burger Icon">
                    <h2>${meals.title}</h2>
                </div>
            </div>
        </div>
    `;
}

function mealContentTemplate(meals, meal_category_id, meal_id) {
    return `
        <div class="meal_card_wrapper">
            <div class="meal_card">
                <div class="meal_card__image_wrapper" id="meal_card__image_wrapper">
                    <img src="${meals.image}" alt="Burger">
                </div>

                <div class="meal_info_wrapper">
                    <div class="meal_title_desc_wrapper">
                        <h3>${meals.name}</h3>
                        <p>${meals.desc}</p>
                    </div>

                    <div class="meal_price_basket_wrapper">
                        <h3>${meals.price} €</h3>
                        <button class="add_basket_btn" id="add_basket_btn" onclick="calculateHub(${meal_category_id},${meal_id}, 'add')">Add to basket</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
function mealToBasketTemplate(mealInfo, meal_id, meal_category_id) {
    return `
        <div class="mealList_card" data-meal_id="${meal_category_id}${meal_id}">
            <img class="trash_icon trash_icon-right" id="trash_icon" src="./assets/icons/delete.svg" alt="Trash Icon" onclick="calculateHub(${meal_category_id},${meal_id}, 'delete')">
            <h4><span id="meal_count_${meal_category_id}${meal_id}">1</span> ${mealInfo.name}</h4>

            <div class="mealList_card__info_wrapper">

                <div class="mealList_card__icon-list">
                    <div class="addSubBtnWrapper">
                        <span class="addSubOneBtn addMeal" id="addOneMealBtn" onclick="calculateHub(${meal_category_id},${meal_id}, 'sub')">-</span> 
                        1 
                        <span class="addSubOneBtn addMeal" id="addOneMealBtn" onclick="calculateHub(${meal_category_id},${meal_id}, 'add')">+</span>
                    </div>
                </div>

                <div class="mealList_card__meal_price">
                    <span id="meal_price_${meal_id}">${mealInfo.price}</span>
                    <span id="">€</span>
                    
                </div>
            </div>
        </div>
    `;

}