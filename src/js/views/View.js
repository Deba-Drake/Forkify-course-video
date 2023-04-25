import icons from "url:../../img/icons.svg";
export default class View {
  _data;

  //method to render
  render(data, searched_item) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      throw new Error(
        `No recipes found for "${searched_item}". Please check the Recipe name and try again!`
      );
    }
    this._data = data;
    const markup = this.generate_markup();
    this.clear();
    this._parent_element.insertAdjacentHTML("afterbegin", markup);
  }

  //method to update the componenets
  update(data) {
    this._data = data;
    const new_markup = this.generate_markup();

    const new_DOM = document.createRange().createContextualFragment(new_markup);
    const current_Elements = Array.from(
      this._parent_element.querySelectorAll("*")
    );
    const new_Elements = Array.from(new_DOM.querySelectorAll("*"));

    new_Elements.forEach((new_element, index) => {
      const current_element = current_Elements[index];
      // console.log(current_element, new_element.isEqualNode(current_element));

      //Updates changes in TEXTCONTEXT
      if (
        !new_element.isEqualNode(current_element) &&
        new_element?.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log("YESYS", new_element.firstChild.nodeValue.trim());
        current_element.textContent = new_element.textContent;
      }

      //Updates chnages in ATTRIBUTES
      if (!new_element.isEqualNode(current_element))
        Array.from(new_element.attributes).forEach((attribute) => {
          current_element.setAttribute(attribute.name, attribute.value);
        });
    });
  }

  //method to clear
  clear() {
    this._parent_element.innerHTML = "";
  }

  //method to render the spinner
  render_spinner() {
    console.log(this._parent_element);
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this.clear();
    this._parent_element.insertAdjacentHTML("afterbegin", markup);
  }

  //method to handle error in the "VIEW"
  render_error_message(error_message) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${error_message}</p>
    </div>`;
    this.clear();
    this._parent_element.insertAdjacentHTML("afterbegin", markup);
  }

  //method to handle success in the "VIEW"
  render_success_message(success_message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${success_message}</p>
    </div>`;
    this.clear();
    this._parent_element.insertAdjacentHTML("afterbegin", markup);
  }
}
