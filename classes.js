const HEIGHT = 150
const WIDTH = 50
class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax=1}) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
    }
    draw() {
        c.drawImage(
          this.image,
          this.framesCurrent * (this.image.width / this.framesMax), // x crop coordinate
          0,
          this.image.width / this.framesMax,
          this.image.height, // these 4 are for the crop. you take the full image and divide it by the amount of different frames
          this.position.x,
          this.position.y,
          (this.image.width / this.framesMax) * this.scale,
          this.image.height * this.scale
        )
      }

    update() {
        this.draw()
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }
}

class Fighter {
    constructor({position, velocity, color = 'red', offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 100,
            height: 50,
            offset: offset
        }
        this.color = color
        this.isAttacking
        this.jump
        this.health = 100
        this.xspeed = 10
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // attack box yas
        if (this.isAttacking) {
            c.fillStyle = 'green'
            c.fillRect(this.attackBox.position.x, 
                this.attackBox.position.y, 
                this.attackBox.width, 
                this.attackBox.height)    
            }
        }
    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x // the reason for  the offset is to change the player's attackboxes' locations and stuff based on the player
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + HEIGHT >= canvas.height) {
            // makes sure player doesn't sink due to gravity
            this.position.y = canvas.height - HEIGHT
            this.velocity.y = 0
            this.jump = 0
            this.xspeed = 10
            this.width = 50
            this.height = 150
        } else {
            this.velocity.y += gravity
            this.xspeed = 5
            this.width = 150
            this.height = 50
        }
    }
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100) //after 100 milliseconds automatically sets to false
    }
    takeHit() {
        this.health -= 20

        if (this.health <= 0) {
            console.log("health gone u dead lol")
        }
    }
}