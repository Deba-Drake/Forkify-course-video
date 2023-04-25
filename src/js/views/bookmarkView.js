import View from "./View.js";
import icons from "url:../../img/icons.svg";
class BookmarkView extends View {
  _parent_element = document.querySelector(".bookmarks__list");

  add_render_bookmark(control_stored_bookmarks) {
    window.addEventListener("load", control_stored_bookmarks);
  }

  generate_markup() {
    return this._data.map(this.generate_markup_card).join("");
  }

  generate_markup_card(result) {
    const current_id = window.location.hash.slice(1);
    return `
      <li class="preview">
        <a class="preview__link ${
          result.id === current_id ? "preview__link--active" : ""
        }" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image_url}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
      `;
  }
}
export default new BookmarkView();
