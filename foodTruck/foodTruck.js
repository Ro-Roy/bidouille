if (typeof window === "undefined") {
    if (!globalThis.stocks && !globalThis.recipes && !globalThis.sleep) {
        const { stocks, recipes } = require("./data");
        const { sleep } = require("./sleep");

        globalThis.stocks = stocks;
        globalThis.recipes = recipes;
        globalThis.sleep = sleep;
    }
}

/*
 *
 * Write your code below these lines
 *
 */

async function order(recipeName) {
    console.log(`Ordering ${recipeName}`);
    const pizzaRecipes = globalThis.recipes.pizza;
    const burgerRecipes = globalThis.recipes.burger;
    const isPizza = recipeName in pizzaRecipes;
    const isBurger = recipeName in burgerRecipes;

    if (!isPizza && !isBurger) {
        console.log(`Recipe ${recipeName} does not exist`);
        return;
    }

    await globalThis.sleep(2);
    console.log(`Production has started for ${recipeName}`);
    await globalThis.sleep(1);
    if (isPizza) {
        await preparePizza(recipeName);
    } else {
        await prepareBurger(recipeName);
    }
}

async function preparePizza(recipeName) {
    const pizza = globalThis.recipes.pizza[recipeName];

    console.log(`Preparing ${pizza.sauce}`);
    if (!checkAndUpdateIngredient(recipeName, pizza.sauce, 1)) {
        return;
    }

    await globalThis.sleep(1);
    const toppingsList = Object.keys(pizza.toppings).join(", ");

    console.log(`Preparing ${toppingsList}`);
    if (!checkAndUpdateIngredients(recipeName, pizza.toppings)) {
        return;
    }

    await globalThis.sleep(1);
    const cheeseList = Object.keys(pizza.cheese).join(", ");

    console.log(`Preparing ${cheeseList}`);
    if (!checkAndUpdateIngredients(recipeName, pizza.cheese)) {
        return;
    }

    await globalThis.sleep(1);
    await endOfOrder(recipeName);
}

async function prepareBurger(recipeName) {
    const burger = globalThis.recipes.burger[recipeName];

    for (const ingredient of Object.keys(burger)) {
        console.log(`Preparing ${ingredient}`);
        if (
            !checkAndUpdateIngredient(
                recipeName,
                ingredient,
                burger[ingredient],
            )
        ) {
            return;
        }

        await globalThis.sleep(1);
    }

    await endOfOrder(recipeName);
}

async function endOfOrder(recipeName) {
    console.log("All ingredients have been prepared");
    await globalThis.sleep(2);
    console.log(`Cooking ${recipeName}`);
    await globalThis.sleep(3);
    console.log(`Delivering ${recipeName}`);
}

function checkAndUpdateIngredient(recipeName, ingredient, quantity) {
    if (globalThis.stocks[ingredient] < quantity) {
        console.log(
            `Not enough ingredients for ${recipeName} because there is no more ${ingredient}`,
        );
        return false;
    }

    globalThis.stocks[ingredient] -= quantity;
    return true;
}

function checkAndUpdateIngredients(recipeName, ingredients) {
    for (const [ingredient, qty] of Object.entries(ingredients)) {
        if (!checkAndUpdateIngredient(recipeName, ingredient, qty)) {
            return false;
        }
    }

    return true;
}

if (typeof window === "undefined") {
    module.exports = {
        order,
    };
}
