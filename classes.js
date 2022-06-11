const HEIGHT = 150
const WIDTH = 50
class Sprite {
    constructor({position, imageSrc}) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
    update() {
        this.draw()
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
            
        }
    }
}