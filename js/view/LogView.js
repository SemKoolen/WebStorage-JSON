class LogView extends Observer{
  constructor(model){
    super(model);
    this.model.addObserver(this);
  }

  update(){
    super.update();
    if (!this.model.reset && !this.model.makeTable) {
      document.querySelector('#value1').innerHTML = this.model.yesterday;
      document.querySelector('#value2').innerHTML = this.model.problems;
      document.querySelector('#value3').innerHTML = this.model.today;
    } else if (this.model.reset) {
      document.querySelector('#day').value = "";
      document.querySelector('#value1').value = "";
      document.querySelector('#value2').value = "";
      document.querySelector('#value3').value = "";
      document.querySelector('#confirm').innerHTML = "Log: "+ this.model.key +" opgeslagen"
    } else if (!this.model.reset && this.model.makeTable) {
      this.makeTable();
      this.adjustTableHeight();
    }
  }

  makeTable() {
      var body = document.getElementsByTagName("body")[0];
      var tbl = document.querySelector('#table');
      while (tbl.firstChild) {
        tbl.removeChild(tbl.firstChild);
      }
      var tblBody = document.createElement("div");

      var row = document.createElement("div");
      row.className = "tableRow" + " headRow";
      var tableHead = ["#", "ID", "Gisteren", "Problemen", "Vandaag"]
      for (let x = 0; x < 5; x++) {
        var cell = document.createElement("div");
        cell.className = "headC" + (x+1);
        var p = document.createElement("p");
        p.appendChild(document.createTextNode(tableHead[x]));
        cell.appendChild(p);
        row.appendChild(cell);
      }
      row.appendChild(cell);
      tblBody.appendChild(row);
      tbl.appendChild(tblBody);

      for (var y = 0; y !== this.model.modifiedKeyArray.length;  y++){
        let key = this.model.modifiedKeyArray[y];
        let jsonString = localStorage.getItem(key);
        jsonString = JSON.parse(jsonString);
        this.yesterday = jsonString[0];
        this.problems = jsonString[1];
        this.today = jsonString[2];
        this.values = [y+1, key, this.yesterday, this.problems, this.today];
        var row = document.createElement("div");
        row.className = "tableRow"   + " row" + (y+1);

        var classArray = ["c1", "c2", "c3", "c4", "c5"];
        for (let x = 0; x < 5; x++){

          var cell = document.createElement("div");
          var p = document.createElement("p");
          p.appendChild(document.createTextNode(this.values[x]));
          cell.appendChild(p);
          cell.className = classArray[x];
          row.appendChild(cell);
        }
        row.appendChild(cell);
        tblBody.appendChild(row);
        tbl.appendChild(tblBody);
      }

      tblBody.appendChild(row);
      tbl.appendChild(tblBody);
  }

  adjustTableHeight() {
    var classArray = ["c1", "c2", "c3", "c4", "c5"];
    for (var j = 0; j < this.model.modifiedKeyArray.length; j++) {
      this.maxHeight = 0;
      for (var k = 0; k < 5; k++) {
        var currentHeight = document.querySelector('.row' + (j+1) +  ' .' + classArray[k]).getElementsByTagName('p')[0];
        if (currentHeight.offsetHeight > this.maxHeight) {
          this.maxHeight = currentHeight.offsetHeight;
        }
      }
      for (var l = 0; l < 5; l++) {
        var classArray = ["c1", "c2", "c3", "c4", "c5"];
        let currentDiv = document.querySelector('.row' + (j+1) +  ' .' + classArray[l]).getElementsByTagName('p')[0];
        currentDiv.style.height = (this.maxHeight-12) + 'px';
      }
    }

  }

}
