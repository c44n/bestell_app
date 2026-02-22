function allMealsTemplate(meals, id) {
    let mealList = "";
    
    for (i = 0; i < meals.meals.length; i++) {
        let meal = meals.meals[i];
        mealList += mealContentTemplate(meal);
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

function mealContentTemplate(meals) {
    return `
        <div class="meal_card_wrapper">
            <div class="meal_card">
                <div class="meal_card__image_wrapper">
                    <img src="${meals.image}" alt="Burger">
                </div>

                <div class="meal_info_wrapper">
                    <div class="meal_title_desc_wrapper">
                        <h3>${meals.name}</h3>
                        <p>${meals.desc}</p>
                    </div>

                    <div class="meal_price_basket_wrapper">
                        <h3>${meals.price} €</h3>
                        <button class="add-basket-btn">Add to basket</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}