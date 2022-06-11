class Sprite {
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
        this.health = 100
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
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
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