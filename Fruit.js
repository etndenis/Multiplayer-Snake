function Fruit(){
    this.color = 0;
    this.fruit = 0;
    this.newFruit();
}


Fruit.prototype.newFruit = function(){

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


exports.Fruit = Snake;