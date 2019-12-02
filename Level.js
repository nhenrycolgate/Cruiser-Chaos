function Level(fileName){
	this.maxDistance=100;
	this.maxPassengers=10;  //max passengers the cruiser can hold
	this.loadedPassengers= 10; //passengers loaded at beginning of round 
	this.currentPassengers=this.loadedPassengers;
	this.accidents= 0;
	this.goals= new Map(); 
	this.goals.set("retention",.5);
	this.goals.set("maxAccidents",5);
	
	
	
	this.readLine = function(line){
		var lineContents= line.split(",");
		var category= lineContents[0];
		var value= lineContents[1];
		switch(category){
			case "distance":
				this.maxDistance= parseFloat(value);
				break;
			case "maxPassengers":
				this.maxPassengers= parseFloat(value);
				break;
			case "loadedPassengers":
				this.loadedPassengers= parseFloat(value);
				this.currentPassengers= this.loadedPassengers;
				break;
			case "retention":
				this.goals.set("retention",parseFloat(value));
				break;
			case "maxAccidents":
				this.goals.set("maxAccidents",value);
				break;
			default:
				break;
		}
		
		
		/*console.log("max distance: " + this.maxDistance);
		console.log("max passengers: " + this.maxPassengers);
		console.log("loaded passengers: " + this.loadedPassengers);
		console.log("current passengers: " + this.currentPassengers);
		console.log("current accidents:  " + this.accidents);
		console.log("retention:  " + this.goals.get("retention"));
		console.log("accidents: "+  this.goals.get("maxAccidents"));*/
	}
	
	this.readString = function(abc){
		var lines= abc.split(/\r\n|\r|\n/g);
		for (var i=0;i<lines.length;i=i+1){
			var line= lines[i];
			this.readLine(line);
		}
		/*console.log("max distance: " + this.maxDistance);
		console.log("max passengers: " + this.maxPassengers);
		console.log("loaded passengers: " + this.loadedPassengers);
		console.log("current passengers: " + this.currentPassengers);
		console.log("current accidents:  " + this.accidents);
		console.log("retention:  " + this.goals.get("retention"));
		console.log("accidents: "+  this.goals.get("maxAccidents"));*/
	}
	
	function readFile(fileName){
		console.log("filename: " + fileName);
	}
}