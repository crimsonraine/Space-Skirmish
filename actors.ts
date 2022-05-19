class Actor {
    
    x : number;
    y : number;

    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
    }

    draw() : void {
    }


    update() : void {
    }

}

class Player extends Actor {

    xVelocity: number;

    //override
    constructor(x : number, y : number) {
        super(x,y);
        this.xVelocity = 0;
    }

    moveLeft() : void {
        this.xVelocity = -5;
    }

    moveRight() : void {
        this.xVelocity = 5;
    }

    draw() : void {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
    }

    update() : void {
        this.x += this.xVelocity;
    }


}

class Player2 extends Actor {

    xVelocity: number;

    //override
    constructor(x : number, y : number) {
        super(x,y);
        this.xVelocity = 0;
    }

    moveLeft() : void {
        this.xVelocity = -5;
    }

    moveRight() : void {
        this.xVelocity = 5;
    }

    draw() : void {
        ctx.fillStyle = "pink";
        ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
    }

    update() : void {
        this.x += this.xVelocity;
    }


}

// class FallingCircle extends Actor {

//     color : string;

//     //override Actor's constructor
//     constructor(x : number, y : number, color : string) {
//         super(x, y ); // calls the Actor's constructor
//         this.color = color;
//     }

//     draw() : void {
//         ctx.fillStyle = this.color;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, 20, 0 , Math.PI * 2);
//         ctx.closePath();
//         ctx.fill();
//     }

//     update() : void {
//         this.y += 5;

//         if (this.y > canvas.height + 50){
//             actorList.removeActor(this);
//         }
//     }
// }

// class Rock extends FallingCircle {
//     //overrides FallingCircle constructor
//     constructor(x : number, y : number){
//         super(x, y, "gray");
//     }

//     //override
//     update() {
//         super.update()
//         //check collision with player
//         if ( Math.sqrt( (this.x - player.x) ** 2 + (this.y - player.y) ** 2 ) < 20){
//             actorList.removeActor(this);
//             window.alert("You died from a rock!");
//         }
//     }
// }

// class Fruit extends FallingCircle {
//     constructor(x : number, y : number){
//         super(x, y, "red");
//     }

//     //override
//     update() {
//         super.update()
//         //check collision with player
//         if ( Math.sqrt( (this.x - player.x) ** 2 + (this.y - player.y) ** 2 ) < 20){
//             actorList.removeActor(this);
//         }
//     }
// }