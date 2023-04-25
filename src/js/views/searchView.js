class SearchView {
  _parent_element = document.querySelector(".search");

  clear() {
    document.querySelector(".search__field").value = "";
  }

  get_searched_item() {
    const searched_item = document.querySelector(".search__field").value;
    setTimeout(this.clear, 2000);
    return searched_item;
  }

  add_search_handler(control_searches) {
    this._parent_element.addEventListener("submit", function (event) {
      event.preventDefault();
      control_searches();
    });
  }
}

export default new SearchView();
