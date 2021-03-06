const GRAVITY = 0.7;
class Actor {
    
    //List all properties:
    x : number;
    y : number;

    constructor(x : number, y : number) {
        //set up properties
        this.x = x;
        this.y = y;
    }

    /**
     * Draw the actor on the canvas.
     */
    draw() : void {
        // Use ctx to draw. A sample (drawing a small circle):
       
    }

    /**
     * Update this actor for the next frame.
     */
    update() : void {
        // Update properties or other Actors in the actorList.
        
    }

}
class Character extends Actor{
    
    // x : number;
    // y : number;
    leftPic : string;
    rightPic : string;
    goingLeft : boolean;
    xVelocity : number;
    yVelocity : number;
    height : number;
    width : number;
    img : HTMLImageElement;
    hp : number;
    velocity : number;
    leftPress : boolean;
    rightPress : boolean;
    upPress : boolean;
    hitbox : number[];


    constructor(x : number, y : number, picturel : string, picturer : string, goingLeft : boolean) {
        super(x, y)
        this.leftPic = picturel;
        this.rightPic = picturer;
        this.goingLeft = goingLeft;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.height = 150;
        this.width = 150;
        this.img = new Image();
        this.hp = 100;
        this.velocity = 0;
        this.leftPress = false;
        this.rightPress = false;
        this.upPress = false;
        this.hitbox = [150,150]
    }

    draw() : void {
        if (this.goingLeft) this.img.src = this.leftPic;
        else this.img.src = this.rightPic;
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width);

    }


    update() : void { // for movemen5
        this.yVelocity += GRAVITY

        this.x += this.xVelocity;
        this.y += this.yVelocity;

        // hit the floor
        if (this.y >= 7/8 * canvas.height - this.height){
            this.y = 7/8 * canvas.height - this.height;
            this.stopMove();
        }

        if (this.y <= -this.height) this.y = -this.height;

        // screenwrap so we don't lose the sprite
        // if (this.x + this.width < 0) this.x = canvas.width;
        // if (this.x > canvas.width) this.x = -this.width;
        
        if (this.leftPress)
            this.moveLeft()
        if (this.rightPress)
            this.moveRight()
        if (this.upPress)
            this.moveUp()
        
        // code for hitting another player here - figure out a way to identify enemy w/o hitting oneself

        // this code no longer works since I fixed the movement issue
        // if someone can fix this, then yay!!
        // if (this.x <= 10 || this.x >= canvas.width){
        //     this.xVelocity = - this.xVelocity
        // }
        if (this.y <= 10){
            this.y = 10
            this.yVelocity = 0
        }
        if (this.x <= 0){
            this.x = 0
            this.xVelocity = 0
        }
        if (this.x + this.width >= canvas.width){
            this.x = canvas.width - this.width
            this.xVelocity = 0
        }
        // if (this.x + this.width < 0) this.x = this.width;
        // if (this.x > this.width) this.x = -this.width;
        //if (this.velocity < -9) this.velocity = -9;
    }

    moveLeft() : void {
        this.xVelocity = -2
        this.x -= 5
    }

    moveRight() : void {
        this.xVelocity = 2
        this.x += 5
    }

    moveUp() : void {
        this.yVelocity -= 10
    }

    stopMove() : void {
        this.xVelocity = 0;
        this.yVelocity = 0;
    }

    hit(sprite : Character) : boolean {
        if (Math.sqrt( (this.x - sprite.x) ** 2 + (this.y - sprite.y) ** 2 ) < 75 ) {
            sprite.hp -= 20; // probably going to depend on the move type; call this when ever a key is pressed
            return true // instead of 20, we need to find another way to make the hitbox
        }
        return false
    }

    atk(sprite: Character) : void {
        // pass for now
    }

    damaged(sprite : Character) : void {
        this.hp -= 10
        if (this.hp <= 0) {
        }
    }

    //health = document.querySelector("enemyHealth") as 
}

class CharacterList {
    characters : Character[]; // two for now if we don't implement something like a 4 player

    constructor(){
        this.characters = [];
    }

    /**
     * Add character to list (if not already included)
     * @param character 
     */
    addCharacter(character : Character) : void {
        if (! this.characters.includes(character)){
            this.characters.push(character);
        }
    }

    /**
     * Add multiple characters to list (if not already included)
     * @param characters 
     */
     addAllCharacters(characters : Character[]) : void {
        for (const character of characters){
            this.addCharacter(character);
        }

    }
    
    /**
     * Use to safely remove an character from the list.
     * Do NOT use this in a loop over this list's characters - instead, call removeAllCharacters.
     * @param character 
     */    
    removeCharacter( character : Character) : void {
        let index : number = this.characters.indexOf(character);
        if (index > -1)
            this.characters.splice(index, 1);
    }

    /**
     * Use to safely remove multiple characters from the list.
     * If not passed an array of characters to remove, removes all characters in this list.
     * @param characters
     */    
    removeAllCharacters( characters : Character[] = this.characters) : void {
        if (characters === this.characters){
            this.characters = [];
            return;
        }
        for (const character of characters){
            this.removeCharacter(character);
        }
    }
}