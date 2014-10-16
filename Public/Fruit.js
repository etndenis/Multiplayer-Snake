
function Fruit(){
    this.color = 0;
    this.fruit = 0;
    this.newFruit();
}


Fruit.prototype.newFruit = function(){
    var x = 100;
    var y = 100;
    x-=x%10;
    y-=y%10;
    var c = randy(0,5);
    if (c<=4){c="white"};
    if (c==5){c="blue"};
    if (c==6){c="red"};
    if (c==7){c="green"};
    this.color=c;
    this.fruit = new Block(x,y,10,10); 
}

Fruit.prototype.draw = function(){
    var s = this.fruit;
    ctx.fillStyle = this.color;
    ctx.fillRect(s.x,s.y,s.height,s.width);
}