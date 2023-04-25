import View from "./View.js";
import { desired_number_of_search_result_cards } from "../configuration.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parent_element = document.querySelector(".pagination");

  add_pagination_handler(control_pagination) {
    this._parent_element.addEventListener("click", function (event) {
      const button_pressed = event.target.closest(".btn--inline");

      if (!button_pressed) return;
      const go_to_page_number = Number(button_pressed.dataset.page_number);
      control_pagination(go_to_page_number);
    });
  }

  generate_markup() {
    //calculating number of Pages
    const number_of_pages = Math.ceil(
      this._data.results.length / desired_number_of_search_result_cards
    );
    const current_page = this._data.current_page;

    //On Page-1, and there are more pages
    if (current_page === 1 && number_of_pages > 1) {
      return `
        <button data-page_number="${
          current_page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${current_page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
    }
    //On the Last page
    if (current_page === number_of_pages && number_of_pages > 1) {
      return `
        <button data-page_number="${
          current_page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${current_page - 1}</span>
        </button>
        `;
    }
    //On Other pages than Page-1
    if (current_page < number_of_pages) {
      return `
        <button data-page_number="${
          current_page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${current_page - 1}</span>
        </button>
        <button data-page_number="${
          current_page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${current_page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
    //On Page-1, and there no more pages
    return "";
  }
}

export default new PaginationView();
