var util = require("util"),					
	io = require("socket.io"),			
	Snake = require("./Snake").Snake;


var socket,
	players;

function init(){
	players = [];
	socket = io.listen(8000);
	socket.configure(function() {
		socket.set("transports", ["websocket"]);

		socket.set("log level", 2);
	});
	setEventHandlers();
	setInterval(function(){
		for (var i = players.length - 1; i >= 0; i--) {
			players[i].move();
		};
	}, 40);
}

var setEventHandlers = function(){
	socket.sockets.on("connection", onSocketConnection);
}

function onSocketConnection(client){
	util.log("New player has connected: "+client.id);

	client.on("disconnect", onClientDisconnect);
	
	client.on("new player", onNewPlayer);

	client.on("move player", onMovePlayer);

	//client.on("next frame", onNextFrame);
}


function onClientDisconnect(){
	util.log("disconnect")
	var removePlayer = playerById(this.id);
	if (!removePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};	
	players.splice(players.indexOf(removePlayer),1);
	this.broadcast.emit("remove player", {id: this.id});
};

function onNewPlayer(data){
	util.log("new player")
	var newPlayer = new Snake(0, 0, data.dirX, data.dirY);
	newPlayer.setSnake(data.snake);
	this.broadcast.emit("new player", {snake:data.snake, dirX: data.dirX, dirY: data.dirY, id: this.id});
	newPlayer.id  = this.id;
	console.log(newPlayer.getSnake())
	for (var i = players.length - 1; i >= 0; i--) {
		this.emit("new player", {id: players[i].id, dirX: players[i].getDirX(), dirY: players[i].getDirY(), snake: players[i].getSnake()});
	};
	players.push(newPlayer);
	var that = this;
	setInterval(function(){
		var snake = playerById(this.id);
		that.emit("server snake",{snake: snake});
		that.broadcast.emit("server snake",{snake: snake});
	},40)
}

function onMovePlayer(data){

	
	var movePlayer = playerById(this.id);
	if (!movePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};	
	movePlayer.setDirX(data.dirX);
	movePlayer.setDirY(data.dirY);

	this.broadcast.emit("move player", {id: this.id, dirX: data.dirX, dirY: data.dirY});
}

function playerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};
	
	return false;
};

init();
