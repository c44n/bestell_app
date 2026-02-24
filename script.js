let allMeals = meals;
let calcType;
let newCount;
let finalPrice;

function init() {
    loadMeals();
}

function loadMeals() {
    let mealsSectionRef = document.getElementById('allMeals');
    for (let i = 0; i < allMeals.length; i++) {
        id = i;
        mealsSectionRef.innerHTML += allMealsTemplate(allMeals[i], id);
    }
}

function addMealToBasket(mealObj) {
    // Prüfung ob Essen vorhanden + Auswählen des richtigen Elements vom Essen
    if (mealObj["basketWrapperRef"].querySelector('[data-meal_id="' + mealObj["meal_id"] + '"]')) {
        // Warenkorbanzahl aktualisieren
        let mealBasketCount = parseInt(mealObj["mealBasketCountRef"].innerText); //parseInt wandelt Textinhalt in Ganzzahl um
        // Anzahl wird erhöhrt
        newCount = mealBasketCount + 1;
        //  Essenspreis mit aktueller Essen-Gesamtsumme addieren + Aktualisierten Preis im Element einfügen
        finalPrice = (mealObj["mealPrice"] + mealObj["subTotal"]).toFixed(2);
    }
    let newObj = { newCount, finalPrice }
    return newObj;
}

function deleteMealFromBasket(mealObj) {
    // Warenkorb Anzahl nehmen und subtrahieren
    let mealBasketCount = parseInt(mealObj["mealBasketCountRef"].innerText);
    let newCount = mealBasketCount - 1;
    // Kosten anpassen
    finalPrice = parseFloat(mealObj["subTotal"] - mealObj["mealPrice"]).toFixed(2); //toFixed(2), um Zahl mit zwei Nachkommastellen zu formatieren

    newObj = { newCount, mealBasketCount, finalPrice }
    return newObj;
}

function calculateStart(meal_category_id, meal_id, calcType) {
    // Warenkorb wrapper
    let basketWrapperRef = document.getElementById('basket__mealList');
    // Essen Infos holen
    let mealInfo = meals[meal_category_id].meals[meal_id];
    // Preis holen und umwandeln von Text in Kommazahl
    let mealPrice = parseFloat(mealInfo.price);
    // Subtotal Element
    let subTotalElementRef = document.getElementById('subtotal_num');
    // Subtotal-Nummer-Element mit Summe holen
    let subTotalStr = subTotalElementRef.innerHTML;
    let subTotal = parseFloat(subTotalStr);
    // Für Sub 
    let mealBasketCountRef = document.getElementById('meal_count_' + meal_id);
    let mealDataRef = basketWrapperRef.querySelector('[data-meal_id="' + meal_id + '"]');

    let addArr = { basketWrapperRef, mealBasketCountRef, mealInfo, mealPrice, subTotalElementRef, subTotalStr, subTotal, meal_id, meal_category_id };
    let subArr = { mealDataRef, mealBasketCountRef, subTotalElementRef, subTotal, mealPrice }

    if (calcType == "add") {
        if (basketWrapperRef.querySelector('[data-meal_id="' + meal_id + '"]')) {
            let newObj = addMealToBasket(addArr);
            mealBasketCountRef.innerHTML = newObj.newCount;
            subTotalElementRef.innerHTML = newObj.finalPrice;
        } else {
            // Wenn ausgewähltes Essen nicht vorhanden ist
            // In Wrapper Element das Essen einfügen
            basketWrapperRef.innerHTML += mealToBasketTemplate(mealInfo, meal_id, meal_category_id);
            // Aktualisierten Preis im Element einfügen
            subTotalElementRef.innerHTML = (subTotal + mealPrice).toFixed(2);
        }
    }

    if (calcType == "sub") {
        let newObj = deleteMealFromBasket(subArr);

        if (newObj.mealBasketCount > 1) {
            mealBasketCountRef.innerHTML = newObj.newCount;
            subTotalElementRef.innerHTML = newObj.finalPrice;
        } else {
            mealDataRef.remove();
            subTotalElementRef.innerHTML = newObj.finalPrice;
        }
    }
}