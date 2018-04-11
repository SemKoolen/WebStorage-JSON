class Observable {
  constructor() {
	this.observers = [];
}
 addObserver(observer){
	this.observers.push(observer);
}
 removeObserver(observer) {
	// indexOf functie geeft -1 als hij geen 	element vind.
	let index =	this.observers.indexOf(observer);
	if(index > -1) {
		this.observers.splice(index, 1);
	}
}
 	notify() {
		for (let i = 0; i < this.observers.length; i++) {
			const observer = this.observers[i];
			observer.update();
		}
	}
}
