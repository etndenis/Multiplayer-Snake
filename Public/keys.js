

var Keys = function(right, left, up, down){
	var left = left || false,
		right = right || false,
		up = up || false,
		down = down || false;

	var onKeyDown = function(e){
		var key = e.keyCode;
		switch(key){
			case 37: //Left
				this.left = true;
				break;
			case 39: //Right
				this.right = true;
				break;
			case 38: //up
				this.up = true;
				break;
			case 40: //down
				this.down = true;
		}
	}

	var onKeyUp = function(e){
		var key = e.keyCode;
		switch(key){
			case 37: //Left
				this.left = false;
				break;
			case 39: //Right
				this.right = false;
			case 38: //up
				this.up = false;
				break;
			case 40: //down
				this.down = false;
		}
	}
	return{
		onKeyDown: onKeyDown,
		onKeyUp: onKeyUp
	}
}