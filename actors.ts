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

    //Add more methods as helpful:

}

// class HealthBar {
//     constructor(x, y, w, h, maxHealth, color) {
//       this.x = x;
//       this.y = y;
//       this.w = w;
//       this.h = h;
//       this.maxHealth = maxHealth;
//       this.maxWidth = w;
//       this.health = maxHealth;
//       this.color = color;
//     }
  
//     show(context) {
//       context.lineWidth = 4;
//       context.strokeStyle = "#333";
//       context.fillStyle = this.color;
//       context.fillRect(this.x, this.y, this.w, this.h);
//       context.strokeRect(this.x, this.y, this.maxWidth, this.h);
//     }
  
//     updateHealth(val) {
//       if (val >= 0) {
//         this.health = val;
//         this.w = (this.health / this.maxHealth) * this.maxWidth;
//       }
//     }
//   }