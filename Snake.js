var Snake = function(x,y,dX,dY,c,id){
    var snake = [], //blockArray //startLength  
        dirX = dX, //direction
        dirY = dY,
        color = c,
        score = 0,
        id = id;
    for (var i = 0; i <= 20; i++) {
        snake.push([(x+(i*10*dirX)), (y+(i*10*dirY))]);
        
    };

    var getDirX = function(){
        return dirX;
    }

    var getDirY = function(){
        return dirY;
    }

    var setDirX = function(x){
        dirX = x;
    }

    var setDirY = function(y){
        dirY = y;
    }   

    var getSnake = function(i){
        if(i!=null)
            return snake[i];
        return snake;
    }

    var setSnake = function(s){
        snake = s;
    }

    var addBlocks = function(x){
        var tailX = (snake[snake.length-1][0]-snake[snake.length-2][0]),
            tailY = snake[snake.length-1][1]-snake[snake.length-2][1];
        for (var i = 0; i <= x; i++) {
            snake.push([snake[snake.length-1][0]+i*10*(tailX/Math.abs(tailX)),snake[snake.length-1][0]+i*10*(tailY/Math.abs(tailY))]);
        };
    }   

    var move = function(){
        snake.unshift([(snake[0][0]+10*-dirX), (snake[0][1]+10*-dirY)]);
        snake.pop();
    }

    return{
 
        move: move,
        getDirX: getDirX,
        getDirY: getDirY,
        setDirX: setDirX,
        setDirY: setDirY,
        getSnake: getSnake,
        setSnake: setSnake,
        id: id
    }

}
exports.Snake = Snake;


