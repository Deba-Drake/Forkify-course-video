import View from "./View.js";
import icons from "url:../../img/icons.svg";
class AddRecipeView extends View {
  _parent_element = document.querySelector(".upload");

  overlay = document.querySelector(".overlay");
  window = document.querySelector(".add-recipe-window");

  open_add_recipe = document.querySelector(".nav__btn--add-recipe");
  close_add_recipe = document.querySelector(".btn--close-modal");

  toggle_window() {
    this.overlay.classList.toggle("hidden");
    this.window.classList.toggle("hidden");
  }

  add_handler_show_modal() {
    //to listen when "Add Recipe" is clicked
    this.open_add_recipe.addEventListener(
      "click",
      this.toggle_window.bind(this)
    );
  }
  add_handler_hide_modal() {
    //to listen when "close" is clicked
    this.close_add_recipe.addEventListener(
      "click",
      this.toggle_window.bind(this)
    );

    //to listen when "overlay" is clicked
    this.overlay.addEventListener("click", this.toggle_window.bind(this));
  }

  add_handler_upload(control_add_recipe) {
    this._parent_element.addEventListener("submit", function (event) {
      event.preventDefault();
      const data_array = [...new FormData(this)];
      const data_object = Object.fromEntries(data_array);
      control_add_recipe(data_object);
    });
  }

  //to call amethod from the same class
  constructor() {
    super(); // because AddRecipeView is a child class
    this.add_handler_show_modal();
    this.add_handler_hide_modal();
  }
  generateMarkup() {
    return `<div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="TEST23" required name="title" type="text" />
    <label>URL</label>
    <input value="TEST23" required name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input value="TEST23" required name="image" type="text" />
    <label>Publisher</label>
    <input value="TEST23" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="23" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="23" required name="servings" type="number" />
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input
      value="0.5,kg,Rice"
      type="text"
      required
      name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 2</label>
    <input
      value="1,,Avocado"
      type="text"
      name="ingredient-2"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 3</label>
    <input
      value=",,salt"
      type="text"
      name="ingredient-3"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 4</label>
    <input
      type="text"
      name="ingredient-4"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 5</label>
    <input
      type="text"
      name="ingredient-5"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 6</label>
    <input
      type="text"
      name="ingredient-6"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
  </div>

  <button class="btn upload__btn">
    <svg>
      <use href="src/img/icons.svg#icon-upload-cloud"></use>
    </svg>
    <span>Upload</span>
  </button>`;
  }
}
export default new AddRecipeView();
