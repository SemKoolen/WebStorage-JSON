class LogModel extends Observable{
  constructor(){
    super();
    if (localStorage.getItem("keyArrayList") == null) {
      this.keyArray = [];
    } else {
      this.keyArray = JSON.parse(localStorage.getItem("keyArrayList"));
    }
  }

  saveValues() {
    let key = document.querySelector('#day').value;
    let values = [document.querySelector('#value1').value,
                  document.querySelector('#value2').value,
                  document.querySelector('#value3').value];
    values = JSON.stringify(values)
    if (!localStorage.getItem(key)) {
      this.keyArray.push(key);
    }
    localStorage.setItem(key, values);
    console.log("Log added: " + localStorage.getItem(key));
    localStorage.setItem("keyArrayList", JSON.stringify(this.keyArray));
    console.log("All existing keys: " + localStorage.getItem("keyArrayList"));
    this.reset= true;
    this.key = key;
    this.notify();
  }

  returnValues() {
    let key = document.querySelector('#day').value;
    let jsonString = localStorage.getItem(key);
    jsonString = JSON.parse(jsonString);
    this.yesterday = jsonString[0];
    this.problems = jsonString[1];
    this.today = jsonString[2];
    this.reset = false;
    this.makeTable = false;

    this.notify();
  }

  createTable(search){
    if (search) {
      var searchString = document.querySelector('#day').value.toLowerCase();
      this.modifiedKeyArray = [];
      for (var x = 0; x !== this.keyArray.length; x++) {
        var string = this.keyArray[x].toLowerCase();
        if (string.indexOf(searchString)>=0) {
          this.modifiedKeyArray.push(this.keyArray[x]);
        }
      }
    }
    else {
    this.modifiedKeyArray = this.keyArray;
    }

    this.reset = false;
    this.makeTable = true;
    this.notify();
  }


}
