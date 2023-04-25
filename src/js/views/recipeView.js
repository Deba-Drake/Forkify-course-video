import View from "./View.js";
import icons from "url:../../img/icons.svg";

class RecipeView extends View {
  _parent_element = document.querySelector(".recipe");

  //method to handle changes in the view using controller
  add_render_handler(control_recipes) {
    ["hashchange", "load"].forEach((event) => {
      window.addEventListener(event, control_recipes);
    });
  }

  add_render_servings_update(control_servings) {
    this._parent_element.addEventListener("click", function (event) {
      const button_pressed = event.target.closest(".btn--tiny");
      if (!button_pressed) return;

      const update_servings_to = Number(button_pressed.dataset.update_servings);
      if (update_servings_to > 0) {
        control_servings(update_servings_to);
      }
    });
  }

  add_render_bookmark(control_bookmarks) {
    this._parent_element.addEventListener("click", function (event) {
      const button_pressed = event.target.closest(".btn--round");
      if (!button_pressed) return;
      control_bookmarks();
    });
  }

  //method to generate the "HTML" markup
  generate_markup() {
    return `
        <figure class="recipe__fig">
          <img src="${this._data.image_url}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cooking_time
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button data-update_servings="${
                this._data.servings - 1
              }" class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button data-update_servings="${
                this._data.servings + 1
              }" class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients
            .map((ingredient) => {
              return `<li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${(ingredient.quantity =
              ingredient.quantity ? ingredient.quantity : "")}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ingredient.unit}</span>
              ${ingredient.description}
            </div>
          </li>`;
            })
            .join("")}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.source_url}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }
}

export default new RecipeView(); // exporting as an object
