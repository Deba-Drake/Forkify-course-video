//polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

//external JS files
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import pagination from "./views/pagination.js";
import addRecipeView from "./views/addRecipeView.js";
import bookmarkView from "./views/bookmarkView.js";
import View from "./views/View.js";
import { async } from "regenerator-runtime";

//FUNCTION TO CONTROL THE RECIPES
const control_recipes = async function () {
  try {
    let id = window.location.hash.slice(1);
    if (!id) return;

    //Update search result to selected search
    resultView.update(model.load_number_of_search_results());
    bookmarkView.update(model.state.bookmarks);

    //Loading Spinner
    recipeView.render_spinner();

    //Loading Recipe
    await model.load_recipe(id);

    //Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    //Rendering Error in for "rendering recipe"
    console.log(error);
    new View().render_error_message(error);
  }
};

//FUNCTION TO CONTROL THE SEARCH
const control_searches = async function () {
  try {
    const searched_item = searchView.get_searched_item();
    if (!searched_item) return;

    //Loading Spinner
    resultView.render_spinner();

    //Loading Search
    await model.load_search_results(searched_item);

    //Rendering Search Results
    try {
      resultView.render(model.load_number_of_search_results(), searched_item);
    } catch (error) {
      resultView.render_error_message(error);
    }

    //Render Pagination(as applicable)
    pagination.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

//FUNCTION TO CONTROL THE PAGINATION NUMBERS
const control_pagination = function (go_to_page_number) {
  //Rendering Search Results after Pagination
  resultView.render(model.load_number_of_search_results(go_to_page_number));

  //Render Pagination Number change(as applicable)
  pagination.render(model.state.search);
};

//FUNCTION TO CONTROL THE SERVINGS NUMBERS
const control_servings = function (new_servings) {
  //Update the data
  model.load_servings(new_servings);

  //Render the updated servings
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

//FUNCTION TO CONTROL THE BOOKMARKS
const control_bookmarks = function () {
  //Adding/Removing Bookmarks
  if (!model.state.recipe.bookmarked) {
    model.add_bookmark(model.state.recipe);
  } else {
    model.delete_bookmark(model.state.recipe.id);
  }
  //Update Recipe after bookmarking
  recipeView.update(model.state.recipe);

  //Render Bookmarks
  try {
    bookmarkView.render(model.state.bookmarks);
  } catch (error) {
    bookmarkView.render_error_message(
      "No bookmarks yet. Find a nice recipe and bookmark it :)"
    );
  }
};

//FUNCTION TO RENDER THE BOOKMARKS FROM LOCALSTORAGE
const control_stored_bookmarks = function (params) {
  if (model.state.bookmarks.length !== 0) {
    bookmarkView.render(model.state.bookmarks);
  }
};

//FUNCTION TO SUBMIT DATA FROM FORM(ADD RECIPE)
const control_add_recipe = async function (recieved_recipe) {
  addRecipeView.render_spinner();

  //to Upload the new Recipe data
  await model.upload_recipe(recieved_recipe);
  console.log(model.state.recipe);

  //to Render the Uploaded data
  recipeView.render(model.state.recipe);

  // addRecipeView.render_success_message("Recipe Added Successfully :)");
  //to Render the Bookmarks after new Recipe is added
  try {
    bookmarkView.render(model.state.bookmarks);
  } catch (error) {
    bookmarkView.render_error_message(
      "No bookmarks yet. Find a nice recipe and bookmark it :)"
    );
  }

  console.log(model.state.recipe.id);
  //Change ID in URL when Reloaded
  window.history.pushState(null, "", `#${model.state.recipe.id}`);

  //to close the modal after 1500 seconds of upload
  setTimeout(function () {
    addRecipeView.toggle_window();
    setTimeout(function () {
      addRecipeView.clear();
      document
        .querySelector(".upload")
        .insertAdjacentHTML("afterbegin", addRecipeView.generateMarkup());
    }, 50);
  }, 1500);
};

const new_feature = function () {
  console.log("Welcome USER to the Application!");
};

const init = function () {
  addRecipeView.add_handler_upload(control_add_recipe);
  bookmarkView.add_render_bookmark(control_stored_bookmarks);
  recipeView.add_render_handler(control_recipes);
  recipeView.add_render_servings_update(control_servings);
  recipeView.add_render_bookmark(control_bookmarks);
  searchView.add_search_handler(control_searches);
  pagination.add_pagination_handler(control_pagination);
  new_feature();
};
init();

///////////////////////////////////////
// ["hashchange", "load"].forEach((event) => {
//   window.addEventListener(event, control_recipes);
// });
// window.addEventListener("hashchange", recipe_data);
// window.addEventListener("load", recipe_data);
