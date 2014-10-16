var Snake = function(x,y,dX,dY,c,id){
    var snake = [], //blockArray //startLength  
        dirX = dX, //direction
        dirY = dY,
        color = c,
        score = 0,
        id = id,
        count = 100;
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

    var control = function(keys){
        var prevX = dirX,
            prevY = dirY;
        if(keys.right&&dirX!=1){
            dirX = -1;
            dirY = 0;
        } else if(keys.left&&dirX!=-1){
            dirX = 1;
            dirY = 0;
        }
        if(keys.up&&dirY!=-1){
            dirY = 1;
            dirX = 0;
        } else if(keys.down&&dirY!=1){
            dirY = -1;
            dirX = 0;
        }

        return (prevX != dirX || prevY != dirY) ? true : false;    
    }

    var draw = function(ctx){
        count--;
        ctx.fillStyle = color;
        for(var i=snake.length-1; i>=0;i--){
            ctx.fillRect(snake[i][0],snake[i][1],10,10);
        }
    }

    return{
        draw: draw,
        control: control,
        move: move,
        getDirX: getDirX,
        getDirY: getDirY,
        setDirX: setDirX,
        setDirY: setDirY,
        getSnake: getSnake,
        id: id,
        setSnake: setSnake
    }

}