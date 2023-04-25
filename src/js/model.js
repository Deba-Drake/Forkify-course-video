import { async } from "regenerator-runtime";
import {
  api_url,
  api_key,
  desired_number_of_search_result_cards,
} from "./configuration.js";
import { post_json, transform_json } from "./helper.js";
export let state = {
  recipe: {},
  search: {
    searched_item: "",
    results: [],
    current_page: 1,
  },
  bookmarks: [],
};

export const load_recipe = async function (id) {
  try {
    const data = await transform_json(`${api_url}/${id}`);
    const { recipe } = data.data;
    state.recipe = { ...recipe };

    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (error) {
    throw error;
  }
};

export const load_search_results = async function (searched_item) {
  try {
    const data = await transform_json(`${api_url}?search=${searched_item}`);
    state.search.searched_item = searched_item;
    state.search.results = data.data.recipes;
    state.search.current_page = 1;
  } catch (error) {
    console.error(error);
  }
};

export const load_number_of_search_results = function (
  page_number = state.search.current_page
) {
  state.search.current_page = page_number;
  const start = (page_number - 1) * desired_number_of_search_result_cards;

  const end = page_number * desired_number_of_search_result_cards;
  return state.search.results.slice(start, end);
};

export const load_servings = function (new_servings) {
  state.recipe.ingredients.forEach((ingredient) => {
    const new_quantity =
      ingredient.quantity * (new_servings / state.recipe.servings);
    if (isNaN(new_quantity)) return;
    ingredient.quantity = new_quantity;
  });
  state.recipe.servings = new_servings;
};

const store_bookmarks = function () {
  localStorage.setItem("Bookmarks", JSON.stringify(state.bookmarks));
};

export const add_bookmark = function (recipe_recieved) {
  //Adding Recipe to Bookmark
  state.bookmarks.push(recipe_recieved);

  //Mark current recipe as bookmarked
  if (recipe_recieved.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  store_bookmarks();
};

export const delete_bookmark = function (recieved_id) {
  //Deleting Recipe to Bookmark
  const index_recieved_id = state.bookmarks.findIndex(
    (bookmark) => bookmark.id === recieved_id
  );
  state.bookmarks.splice(index_recieved_id, 1);

  //Unmark current recipe as bookmarked
  if (recieved_id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  store_bookmarks();
};

export const upload_recipe = async function (recieved_recipe) {
  //Getting only inserted ingredients in correct format
  const ingredients = Object.entries(recieved_recipe)
    .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
    .map((ingredient) => {
      let [quantity, unit, description] = ingredient[1].split(",");
      return {
        quantity: quantity ? +quantity : null,
        unit: unit ? unit : "",
        description: description ? description : "",
      };
      //Making recipe in correct format
    });
  const recipe = {
    publisher: recieved_recipe.publisher,
    source_url: recieved_recipe.sourceUrl,
    image_url: recieved_recipe.image,
    title: recieved_recipe.title,
    cooking_time: +recieved_recipe.cookingTime,
    servings: +recieved_recipe.servings,
    ingredients,
  };
  const data = await post_json(`${api_url}?key=${api_key}`, recipe);
  state.recipe = Object.assign({}, data.data.recipe);
  add_bookmark(state.recipe);
};

const init = function () {
  const stored_bookmarks = localStorage.getItem("Bookmarks");
  if (stored_bookmarks) {
    state.bookmarks = JSON.parse(stored_bookmarks);
  }
};
init();

const clear_bookmarks = function () {
  localStorage.clear("Bookmarks");
};
