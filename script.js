let allMeals = meals;
let calcType;
let newCount;
let finalPrice;
let deliverPrice = parseFloat(4.99);
let deliverFinalPrice;
let basketCounter = 1;

let buyBtnNumRef = document.getElementById('buy_btn_num');
const dialogRef = document.getElementById('delivereDialog');

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
    if (mealObj["basketWrapperRef"].querySelector('[data-meal_id="' + mealObj["meal_category_id"] + mealObj["meal_id"] + '"]')) {
        // Warenkorbanzahl aktualisieren
        let mealBasketCount = parseInt(mealObj["mealBasketCountRef"].innerText); //parseInt wandelt Textinhalt in Ganzzahl um
        // Anzahl wird erhöhrt
        newCount = mealBasketCount + 1;
        //  Essenspreis mit aktueller Essen-Gesamtsumme addieren + Aktualisierten Preis im Element einfügen
        finalPrice = (mealObj["mealPrice"] + mealObj["subTotal"]).toFixed(2);
        deliverFinalPrice = (mealObj["mealPrice"] + mealObj["subTotal"] + mealObj["deliverPrice"]).toFixed(2);
        basketCounter++;
    }
    let newObj = { newCount, finalPrice, deliverFinalPrice, basketCounter }
    return newObj;
}

function deleteMealFromBasket(mealObj) {
    // Warenkorb Anzahl nehmen und subtrahieren
    let mealBasketCount = parseInt(mealObj["mealBasketCountRef"].innerText);
    let newCount = mealBasketCount - 1;
    // Kosten anpassen
    finalPrice = parseFloat(mealObj["subTotal"] - mealObj["mealPrice"]).toFixed(2); //toFixed(2), um Zahl mit zwei Nachkommastellen zu formatieren
    deliverFinalPrice = (mealObj["subTotal"] - mealObj["mealPrice"] + mealObj["deliverPrice"]).toFixed(2);
    basketCounter--;
    newObj = { newCount, mealBasketCount, finalPrice, deliverFinalPrice, basketCounter }
    return newObj;
}

function calculateStart(meal_category_id, meal_id, calcType) {
    let basketWrapperRef = document.getElementById('basket__mealList');
    let basket_activeRef = document.getElementById('basket_active');
    let basket_offRef = document.getElementById('basket_off');
    let trashIconRef = document.getElementById('trash_icon');
    let addMealBtn = document.getElementById('addOneMealBtn');
    let mobileBasketIconRef = document.getElementById('mobile_cart_icon');
    let mobileBasketIconCounter = document.getElementById('mobile_cart_counter');

    // Essen Infos holen
    let mealInfo = meals[meal_category_id].meals[meal_id];
    // Preis holen und umwandeln von Text in Kommazahl
    let mealPrice = parseFloat(mealInfo.price);

    // Subtotal Element
    let subTotalElementRef = document.getElementById('subtotal_num');
    let totalNumElementRef = document.getElementById('total_num');
    // Subtotal-Nummer-Element mit Summe holen
    let subTotal = parseFloat(subTotalElementRef.innerHTML);
    // Für Sub 
    let mealBasketCountRef = document.getElementById('meal_count_' + meal_category_id + meal_id);
    let mealDataRef = basketWrapperRef.querySelector('[data-meal_id="' + meal_category_id + meal_id + '"]');

    let addArr = { deliverPrice, basketWrapperRef, mealBasketCountRef, mealInfo, mealPrice, subTotalElementRef, subTotal, meal_id, meal_category_id };
    let subArr = { deliverPrice, mealDataRef, mealBasketCountRef, subTotalElementRef, subTotal, mealPrice }



    if (calcType == "add") {
        if (basketWrapperRef.querySelector('[data-meal_id="' + meal_category_id + meal_id + '"]')) {
            let newObj = addMealToBasket(addArr);
            mealBasketCountRef.innerHTML = newObj.newCount;
            subTotalElementRef.innerHTML = newObj.finalPrice;
            totalNumElementRef.innerHTML = newObj.deliverFinalPrice;
            buyBtnNumRef.innerHTML = newObj.deliverFinalPrice;
            mobileBasketIconCounter.innerHTML = newObj.basketCounter;

            trashIconRef.classList.add('trash-icon-right');
            addMealBtn.innerHTML = "- 1 +";
        } else {
            // Wenn ausgewähltes Essen nicht vorhanden ist
            // In Wrapper Element das Essen einfügen
            basketWrapperRef.innerHTML += mealToBasketTemplate(mealInfo, meal_id, meal_category_id);
            // Aktualisierten Preis im Element einfügen
            subTotalElementRef.innerHTML = (subTotal + mealPrice).toFixed(2);
            totalNumElementRef.innerHTML = (subTotal + mealPrice + deliverPrice).toFixed(2);
            buyBtnNumRef.innerHTML = (subTotal + mealPrice + deliverPrice).toFixed(2);
            mobileBasketIconCounter.innerHTML = basketCounter;

            basket_activeRef.classList.remove('display-none');
            basket_offRef.classList.add('display-none');
            mobileBasketIconRef.style.color = 'var(--primary-color)';
            mobileBasketIconCounter.classList.remove('display-none');
        }
    }

    if (calcType == "sub") {
        let newObj = deleteMealFromBasket(subArr);
        if (newObj.mealBasketCount > 1) {
            mealBasketCountRef.innerHTML = newObj.newCount;
            subTotalElementRef.innerHTML = newObj.finalPrice;
            totalNumElementRef.innerHTML = newObj.deliverFinalPrice;
            buyBtnNumRef.innerHTML = newObj.deliverFinalPrice;
            mobileBasketIconCounter.innerHTML = newObj.basketCounter;
        } else {
            mealDataRef.remove();
            subTotalElementRef.innerHTML = newObj.finalPrice;
            mobileBasketIconCounter.innerHTML = 1;
            mobileBasketIconCounter.classList.add('display-none');

            if (subTotalElementRef.innerHTML == "0.00") {
                basket_activeRef.classList.add('display-none');
                basket_offRef.classList.remove('display-none');
            }
        }
    }
}

let closeTimer;
let basketWrapperRef = document.getElementById('basket_wrapper');

function openDialog() {
    dialogRef.showModal();
    basketWrapperRef.classList.add('display-none');

    closeTimer = setTimeout(() => {
        dialogRef.close();
    }, 15000);
}

function closeDialog() {
    dialogRef.close();
}

let closeBasketMobileRef = document.getElementById('closeBasketMobileBtn');

function closeBasketMobile(){
    basketWrapperRef.classList.add('display-none-mobile');
}

function openBasketMobile(){
    basketWrapperRef.classList.remove('display-none-mobile');
}