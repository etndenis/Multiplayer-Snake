
var canvas,         //Canvas dom element
    ctx,            //Canvas rendereing element      
    fruit,          //Fruit for snake
    keys,//remotePlayers,  //Remote players
    localPlayer,
    remotePlayers,
    socket
    count=0
    seversnake = [],
    press = true;         //Socket connection

function init() {
    canvas = document.getElementById("canvas");
    if (canvas.getContext)
        ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    remotePlayers = [];
    fruit = new Fruit();
    keys = new Keys();//make the fruit
    localPlayer = new Snake(Math.floor(randy(0,canvas.width-20))+10,30,0,-1,"blue");

    socket = io.connect("http://localhost", {port: 8000, transports: ["websocket"]});

    setEventHandlers();
     
}

var setEventHandlers = function(){
    window.addEventListener("keydown",onKeyDown,false);
    window.addEventListener("keyup",onKeyUp,false);
    window.addEventListener("resize",onResize,false);

    socket.on("connect", onSocketConnected);

    socket.on("disconnect", onSocketDisconnect);

    socket.on("new player", onNewPlayer);

    socket.on("move player", onMovePlayer);

    socket.on("remove player", onRemovePlayer);

    socket.on("server snake", onServerUpdate);
}

function onServerUpdate(data){
    var snake = snakeById(data.id);
    if(snake==false){
        seversnake.push(new Snake(0,0,0,1));
        seversnake[seversnake.length-1].id = data.id;
         seversnake[seversnake.length-1].setSnake(data.snake,10)}
    else
        snake.setSnake(data.snake);
}

function onSocketConnected(){
    console.log("Connected to socket server");
    socket.emit("new player", {snake: localPlayer.getSnake(), dirX: localPlayer.getDirX(), dirY: localPlayer.getDirY()})
}

function onSocketDisconnect() {
    console.log("Disconnected from socket server");
};

function onNewPlayer(data){
    console.log("new player")
    console.log("dir X : " + data.dirX)
    if(data.snake==undefined)
        remotePlayers.push(new Snake(data.x, data.y, data.dirX, data.dirY));
    else {
        remotePlayers.push(new Snake(0, 0, data.dirX, data.dirY));
        remotePlayers[remotePlayers.length-1].setSnake(data.snake);
    }
    console.log(remotePlayers[remotePlayers.length-1].getSnake());
    remotePlayers[remotePlayers.length-1].id = data.id;
}

function onMovePlayer(data){
    
    var movePlayer = playerById(data.id);

    if (!movePlayer) {
        console.log("Player not found: "+data.id);
        return;
    };    
    movePlayer.setDirX(data.dirX);
    movePlayer.setDirY(data.dirY);

}

function onRemovePlayer(data){
    console.log("removePlayer")

    var removePlayer = playerById(data.id);
    remotePlayers.splice(remotePlayers.indexOf(removePlayer),1);
}

function onResize(e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

function update(){
        socket.emit("move player", {dirX: localPlayer.getDirX(), dirY: localPlayer.getDirY()});
}

function act(){
    setInterval(function(){
    
    ctx.clearRect(0,0,2000,6000);
    for (var i = remotePlayers.length - 1; i >= 0; i--) {

        remotePlayers[i].move();
        remotePlayers[i].draw(ctx);
        if(count<100){
       }
    };
    count++;
    update();
    localPlayer.control(keys);
    localPlayer.move();
    localPlayer.draw(ctx);
    for (var i = seversnake.length - 1; i >= 0; i--) {
        ctx.fillStyle = "red";
        seversnake[i].draw(ctx);
    };
    fruit.draw();
    socket.emit("next frame",{});},40);

    //window.requestAnimFrame(act);
}

function onKeyDown(e){
    if(localPlayer){
        keys.onKeyDown(e);
    }
}

function onKeyUp(e){
    if(localPlayer){
        keys.onKeyUp(e);
    }
}

function randy(min, max) {
    var temp = Math.floor(Math.random() * (max - min + 1) + min);
    return temp - temp%10;
}

function playerById(id) {
    var i;
    for (i = 0; i < remotePlayers.length; i++) {
        if (remotePlayers[i].id == id)

            return remotePlayers[i];
    };
    
    return false;
};
function snakeById(id) {
    var i;
    for (i = 0; i < seversnake.length; i++) {
        if (seversnake[i].id == id)

            return seversnake[i];
    };
    
    return false;
};

act();