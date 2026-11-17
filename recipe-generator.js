function generateRecipes(ingredients) {
  const bin = new Set(ingredients.map(name => name.toLowerCase()));
  const ideas = [];
  const has = food => bin.has(food);
  const available = foods => foods.filter(has);

  function add(name, foods, steps) {
    ideas.push({ name, foods, steps });
  }

  // Build fillings from what the player actually selected.
  const fillings = [];

  if (has("eggs")) {
    fillings.push({
      name: "Scrambled egg",
      foods: ["eggs"],
      prep: "Beat the eggs and stir them in a nonstick skillet until set."
    });
  }

  if (has("spinach") && has("tomatoes")) {
    fillings.push({
      name: "Spinach and tomato",
      foods: ["spinach", "tomatoes"],
      prep: "Chop the tomatoes. Warm them in a skillet, then stir in the spinach until it wilts."
    });
  }

  if (has("avocado")) {
    fillings.push({
      name: "Mashed avocado",
      foods: ["avocado"],
      prep: "Scoop the avocado into a bowl and mash it with a fork."
    });
  }

  // Pair each filling with each base that works for it.
  for (const filling of fillings) {
    const toppings = available(["cheese", "hot sauce"]);
    const finish = toppings.length ? ` Top with ${toppings.join(" and ")}.` : "";

    if (has("tortillas")) {
      add(`${filling.name} wrap`,
        ["tortillas", ...filling.foods, ...toppings],
        [filling.prep, `Warm a tortilla, spoon the filling down the middle, and fold in the sides.${finish ? " Add the toppings before rolling: " + toppings.join(" and ") + "." : ""} Roll it up.`]);
    }

    for (const base of available(["bread", "bagels"])) {
      const bottom = base === "bread" ? "toast" : "bagel";
      add(`${filling.name} ${bottom}`,
        [base, ...filling.foods, ...toppings],
        [filling.prep, `Toast the ${base === "bread" ? "bread" : "bagel halves"} and spoon the filling on top.${finish}`]);
    }

    if (has("rice")) {
      const sauces = available(["soy sauce", "hot sauce"]);
      add(`${filling.name} rice bowl`,
        ["rice", ...filling.foods, ...sauces],
        ["Cook the rice in water according to the package.", filling.prep,
         "Spoon the filling over the rice." + (sauces.length ? ` Finish with a splash of ${sauces[0]}.` : "")]);
    }
  }

  // Sweet combinations use different pairings and preparation methods.
  if (has("yogurt")) {
    const extras = available(["bananas", "berries", "peanut butter", "jam"]);
    for (const extra of extras) {
      const prep = {
        bananas: "Slice a banana into coins and layer them with the yogurt.",
        berries: "Mash a few berries, swirl them into the yogurt, and scatter the rest on top.",
        "peanut butter": "Stir a spoonful of peanut butter into the yogurt until creamy.",
        jam: "Spoon yogurt into a bowl and swirl in a little jam."
      };
      add(`Yogurt with ${extra}`, ["yogurt", extra], [prep[extra]]);
    }
  }

  return ideas;
}
