let allMeals = meals;
let calcType;
let newCount;
let finalPrice;
let deliverPrice = parseFloat(4.99);
let deliverFinalPrice;
let basketCounter = 0;
let closeTimer;

const buyBtnNumRef = document.getElementById('buy_btn_num');
const dialogRef = document.getElementById('delivereDialog');
const mobileBasketIconRef = document.getElementById('mobile_cart_icon');
const basketMealListRef = document.getElementById('basket__mealList');
const basket_activeRef = document.getElementById('basket_active');
const basket_offRef = document.getElementById('basket_off');
const basket_wrapperRef = document.getElementById('basket_wrapper');
const mobileBasketIconCounter = document.getElementById('mobile_cart_counter');
const mealsSectionRef = document.getElementById('allMeals');
const subTotalElementRef = document.getElementById('subtotal_num');
const totalNumElementRef = document.getElementById('total_num');
const buyBtnRef = document.getElementById('buy_btn');
const closeBasketMobileRef = document.getElementById('closeBasketMobileBtn');

function init() {
    loadMeals();
}

function loadMeals() {
    for (let i = 0; i < allMeals.length; i++) {
        id = i;
        mealsSectionRef.innerHTML += allMealsTemplate(allMeals[i], id);
    }
}

function addMealToBasket(mealObj) {
    if (mealObj["basketMealListRef"].querySelector('[data-meal_id="' + mealObj["meal_category_id"] + mealObj["meal_id"] + '"]')) {
        // Warenkorbanzahl aktualisieren
        let mealBasketCount = parseInt(mealObj.mealBasketCountRef.innerText); //parseInt wandelt Textinhalt in Ganzzahl um
        newCount = mealBasketCount + 1;
        //  Essenspreis mit aktueller Essen-Gesamtsumme addieren + Aktualisierten Preis im Element einfügen
        finalPrice = (mealObj.mealPrice + mealObj.subTotal).toFixed(2);
        deliverFinalPrice = (mealObj.mealPrice + mealObj.subTotal + mealObj.deliverPrice).toFixed(2);
        basketCounter++;
    }
    mealObj.mealBasketCountRef.innerHTML = newCount;
    mealObj.subTotalElementRef.innerHTML = finalPrice;
    mealObj.totalNumElementRef.innerHTML = deliverFinalPrice;
    mealObj.buyBtnNumRef.innerHTML = deliverFinalPrice;
    mealObj.mobileBasketIconCounter.innerHTML = basketCounter;
}

function addMealFirstToBasket(mealObj) {
    // In Wrapper Element das Essen einfügen
    mealObj.basketMealListRef.classList.remove('display-none-mobile');
    mealObj.basketMealListRef.innerHTML += mealToBasketTemplate(mealObj.mealInfo, mealObj.meal_id, mealObj.meal_category_id);
    // Aktualisierten Preis im Element einfügen
    mealObj.subTotalElementRef.innerHTML = (mealObj.subTotal + mealObj.mealPrice).toFixed(2);
    mealObj.totalNumElementRef.innerHTML = (mealObj.subTotal + mealObj.mealPrice + mealObj.deliverPrice).toFixed(2);
    mealObj.buyBtnNumRef.innerHTML = (mealObj.subTotal + mealObj.mealPrice + mealObj.deliverPrice).toFixed(2);
    basketCounter++;
    mealObj.mobileBasketIconCounter.innerHTML = basketCounter;

    mealObj.basket_activeRef.classList.remove('display-none');
    mealObj.basket_offRef.classList.add('display-none');
    mealObj.mobileBasketIconCounter.classList.remove('display-none');
}

function calculateHub(meal_category_id, meal_id, calcType) {
    // Essen Infos holen
    let mealInfo = meals[meal_category_id].meals[meal_id];
    let mealPrice = parseFloat(mealInfo.price);
    let subTotal = parseFloat(subTotalElementRef.innerHTML);
    // Anzahl Meal
    let mealBasketCountRef = document.getElementById('meal_count_' + meal_category_id + meal_id);
    let mealDataRef = basketMealListRef.querySelector('[data-meal_id="' + meal_category_id + meal_id + '"]');

    let addArr = { basket_activeRef, basket_offRef, mobileBasketIconCounter, buyBtnNumRef, totalNumElementRef, deliverPrice, basketMealListRef, mealBasketCountRef, mealInfo, mealPrice, subTotalElementRef, subTotal, meal_id, meal_category_id };
    let subArr = { mealDataRef, totalNumElementRef, deliverPrice, mealBasketCountRef, subTotalElementRef, subTotal, mealPrice }
    let deleteArr = { mealBasketCountRef, mealPrice, mealDataRef, subTotal, subTotalElementRef, totalNumElementRef };
    calculateStart(addArr, subArr, deleteArr, calcType, meal_category_id, meal_id);
}

function calculateStart(addArr, subArr, deleteArr, calcType, meal_category_id, meal_id) {
    if (calcType == "add") {
        if (basketMealListRef.querySelector('[data-meal_id="' + meal_category_id + meal_id + '"]')) {
            addMealToBasket(addArr);
        } else {
            // Wenn ausgewähltes Essen nicht vorhanden ist
            addMealFirstToBasket(addArr);
        }
    }

    if (calcType == "sub") {
        deleteMealFromBasket(subArr);
    }

    if (calcType == "delete") {
        deleteMealComplete(deleteArr);
    }
}

function deleteMealFromBasket(mealObj) {
    // Warenkorb Anzahl nehmen und subtrahieren
    let mealBasketCount = parseInt(mealObj["mealBasketCountRef"].innerText);
    let newCount = mealBasketCount - 1;
    // Kosten anpassen
    finalPrice = parseFloat(mealObj["subTotal"] - mealObj["mealPrice"]).toFixed(2); //toFixed(2), um Zahl mit zwei Nachkommastellen zu formatieren
    deliverFinalPrice = (mealObj["subTotal"] - mealObj["mealPrice"] + mealObj["deliverPrice"]).toFixed(2);
    basketCounter--;

    deleteMeal(mealObj, mealBasketCount, newCount);
}

function deleteMeal(mealObj, mealBasketCount, newCount) {
    if (mealBasketCount > 1) {
        mealObj.mealBasketCountRef.innerHTML = newCount;
        mealObj.subTotalElementRef.innerHTML = finalPrice;
        mealObj.totalNumElementRef.innerHTML = deliverFinalPrice;
        buyBtnNumRef.innerHTML = deliverFinalPrice;
        mobileBasketIconCounter.innerHTML = basketCounter;
    } else {
        deleteMealComplete(mealObj);
    }
}

function deleteMealComplete(mealObj, mealBasketCount) {
    mealBasketCount = parseInt(mealObj["mealBasketCountRef"].innerText);
    let nowSum = mealObj["mealPrice"] * mealBasketCount;
    let diffSum = mealObj["subTotal"] - nowSum;

    mealObj["mealDataRef"].remove();
    mealObj["subTotalElementRef"].innerHTML = diffSum.toFixed(2);

    if (diffSum > 0) {
        mealObj["totalNumElementRef"].innerHTML = parseFloat(diffSum + deliverPrice).toFixed(2);
    } else {
        mealObj["totalNumElementRef"].innerHTML = 0.00.toFixed(2);
        buyBtnNumRef.innerHTML = 0.00.toFixed(2);
    }
}

function openDialog() {
    dialogRef.showModal();
    basketMealListRef.classList.add('display-none');

    mobileBasketIconCounter.innerHTML = 0;
    subTotalElementRef.innerHTML = 0.00;
    totalNumElementRef.innerHTML = 0.00;
    buyBtnNumRef.innerHTML = 0.00;
    mobileBasketIconCounter.classList.add('display-none-mobile');
    basket_wrapperRef.classList.add('display-none');

    closeTimer = setTimeout(() => {
        dialogRef.close();
    }, 15000);
}

function closeDialog() {
    dialogRef.close();
}

function closeBasketMobile() {
    basket_wrapperRef.classList.add('display-none-mobile');
}

function openBasketMobile() {
    basket_wrapperRef.classList.remove('display-none-mobile');
}