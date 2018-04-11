class Controller {
  constructor() {
    this.model = new LogModel();
    this.view = new LogView(this.model);
    this.textArea = new TextArea();
    this.createListeners();
  }

  createListeners() {
    let save = document.querySelector('#save');
    if (save !== null) { save.addEventListener("click", (e) => this.model.saveValues()) };
    let search = document.querySelector('#search');
    if (search !== null) {search.addEventListener("click", (e) => this.searchValues()) };
    let search2 = document.querySelector('#search2');
    if (search2 !== null) {search2.addEventListener("click", (e) => this.createTable(true)) };
    let text = document.querySelector("#useless").innerText;
    if (text == "true") {
      this.textArea.initialize();
    } else {
      this.createTable();
    }
  }

  searchValues() {
    this.model.returnValues();
    let text = document.querySelector("#useless").innerText;
    if (text == "true") { this.textArea.initialize()} ;
  }

  createTable(boolean) {
    this.model.createTable(true);
    window.addEventListener('resize', (e) => this.model.createTable(true));
  }
}
