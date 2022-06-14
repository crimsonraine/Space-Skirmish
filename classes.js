const HEIGHT = 150
const WIDTH = 50
class Sprite {
    constructor({
      position,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, x2:0, y: 0 }
    }) {
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
      this.offset = offset
    }
    draw() {
        c.drawImage(
          this.image,
          this.framesCurrent * (this.image.width / this.framesMax),
          0,
          this.image.width / this.framesMax,
          this.image.height,
          this.position.x - this.offset.x,
          this.position.y - this.offset.y,
          (this.image.width / this.framesMax) * this.scale,
          this.image.height * this.scale
        )
      }

      animateFrames() {
        this.framesElapsed++
    
        if (this.framesElapsed % this.framesHold === 0) {
          if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++
          } else {
            this.framesCurrent = 0
          }
        }
      }

    update() {
        this.draw()
        this.animateFrames()
    }
}

class Fighter extends Sprite {
    constructor({
      position,
      velocity,
      color = 'red',
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, x2:0, y: 0 },
      sprites,
      attackBox = { offset: {}, width: undefined, height: undefined }
    }) {
      super({
        position,
        imageSrc: imageSrc,
        scale,
        framesMax,
        offset
      })
  
      this.velocity = velocity
      this.width = 50
      this.height = 150
      this.lastKey
      this.actionName
      this.attackBox = {
        position: {
          x: this.position.x,
          y: this.position.y
        },
        offset: attackBox.offset,
        width: attackBox.width,
        height: attackBox.height
      }
      this.color = color
      this.isAttacking
      this.isAttacking2
      this.health = 100
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.xspeed = 10
      this.sprites = sprites
      this.dead = false
      this.cooldown
      this.cooldown2
  
      for (const sprite in this.sprites) {
        sprites[sprite].image = new Image()
        sprites[sprite].image.src = sprites[sprite].imageSrc
      }
    }
    // draw() {
    //     c.fillStyle = this.color
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height)

    //     // attack box yas
    //     if (this.isAttacking) {
    //         c.fillStyle = 'green'
    //         c.fillRect(this.attackBox.position.x, 
    //             this.attackBox.position.y, 
    //             this.attackBox.width, 
    //             this.attackBox.height)    
    //         }
    //     }

    update() {
        this.draw()
        if(!this.dead) this.animateFrames()
        
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x // the reason for  the offset is to change the player's attackboxes' locations and stuff based on the player
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // draw the attackbox
        // c.fillRect(this.attackBox.position.x, 
        //     this.attackBox.position.y, 
        //     this.attackBox.width, 
        //     this.attackBox.height)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //if (this.position.y + this.height + this.velocity.y >= 300) {
        if(this.position.y + this.height >= canvas.height) {
            // makes sure player doesn't sink due to gravity
            this.position.y = canvas.height - this.height
            //this.position.y = 200
            this.velocity.y = 0
            this.jump = 0
            this.xspeed = 10
            // this.width = 50
            // this.height = 150
        } else {
            this.velocity.y += gravity
            this.xspeed = 5
            // this.width = 150
            // this.height = 50
        }
    }
    attack() {
        this.actionName = 'attack1'
        if (player.position.x > enemy.position.x) {
          this.switchSprite2(this.actionName)
        } else {
          this.switchSprite(this.actionName)
        }
        this.isAttacking = true
        this.cooldown = true
        // setTimeout(() => {
        //     this.cooldown = false
        // }, 1000)
    }
    takeHit(numHits = 1) {
        this.health -= 20 * numHits

        if (this.health <= 0) {
          this.actionName = 'death'
          if (player.position.x > enemy.position.x) {
            this.switchSprite2(this.actionName)
          } else {
            this.switchSprite(this.actionName)
          }
        } else {
          this.actionName = 'takeHit'
          if (player.position.x > enemy.position.x) {
            this.switchSprite2(this.actionName)
          } else {
            this.switchSprite(this.actionName)
          }
        }
    }
    doubleJumpAttack() {
      this.actionName = 'attack2'
        if (player.position.x > enemy.position.x) {
          this.switchSprite2(this.actionName)
        } else {
          this.switchSprite(this.actionName)
        }
      this.isAttacking2 = true
    }
    switchSprite(sprite) {
      // override with death
      if (!this.dead) {
        if (this.image === this.sprites.death.image) {
          if (this.framesCurrent === this.sprites.death.framesMax - 1) this.dead = true
          return
        }
        // overriding all other animations w double jump attack animation
        if (this.image === this.sprites.attack2.image && 
          this.framesCurrent < this.sprites.attack2.framesMax - 1) return
        // overriding all other animations w attack animation
        if (this.image === this.sprites.attack1.image && 
            this.framesCurrent < this.sprites.attack1.framesMax - 1) return
        // override w take hit
        if (this.image === this.sprites.takeHit.image && 
              this.framesCurrent < this.sprites.takeHit.framesMax - 1) return
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack2':
                if (this.image !== this.sprites.attack2.image) {
                    this.image = this.sprites.attack2.image
                    this.framesMax = this.sprites.attack2.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'takeHit':
              if (this.image !== this.sprites.takeHit.image) {
                  this.image = this.sprites.takeHit.image
                  this.framesMax = this.sprites.takeHit.framesMax
                  this.framesCurrent = 0
              }
              break
            case 'death':
              if (this.image !== this.sprites.death.image) {
                  this.image = this.sprites.death.image
                  this.framesMax = this.sprites.death.framesMax
                  this.framesCurrent = 0
              }
              break
        }
      }
    }
    switchSprite2(sprite) {
      // override with death
      if (!this.dead) {
        if (this.image === this.sprites.deathFlip.image) {
          if (this.framesCurrent === this.sprites.deathFlip.framesMax - 1) this.dead = true
          return
        }
        // overriding all other animations w double jump attack animation
        if (this.image === this.sprites.attack2Flip.image && 
          this.framesCurrent < this.sprites.attack2Flip.framesMax - 1) return
        // overriding all other animations w attack animation
        if (this.image === this.sprites.attack1Flip.image && 
            this.framesCurrent < this.sprites.attack1Flip.framesMax - 1) return
        // override w take hit
        if (this.image === this.sprites.takeHitFlip.image && 
              this.framesCurrent < this.sprites.takeHitFlip.framesMax - 1) return
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idleFlip.image) {
                    this.image = this.sprites.idleFlip.image
                    this.framesMax = this.sprites.idleFlip.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.runFlip.image) {
                    this.image = this.sprites.runFlip.image
                    this.framesMax = this.sprites.runFlip.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jumpFlip.image) {
                    this.image = this.sprites.jumpFlip.image
                    this.framesMax = this.sprites.jumpFlip.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fallFlip.image) {
                    this.image = this.sprites.fallFlip.image
                    this.framesMax = this.sprites.fallFlip.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack1':
                if (this.image !== this.sprites.attack1Flip.image) {
                    this.image = this.sprites.attack1Flip.image
                    this.framesMax = this.sprites.attack1Flip.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack2':
                if (this.image !== this.sprites.attack2Flip.image) {
                    this.image = this.sprites.attack2Flip.image
                    this.framesMax = this.sprites.attack2Flip.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'takeHit':
              if (this.image !== this.sprites.takeHitFlip.image) {
                  this.image = this.sprites.takeHitFlip.image
                  this.framesMax = this.sprites.takeHitFlip.framesMax
                  this.framesCurrent = 0
              }
              break
            case 'death':
              if (this.image !== this.sprites.deathFlip.image) {
                  this.image = this.sprites.deathFlip.image
                  this.framesMax = this.sprites.deathFlip.framesMax
                  this.framesCurrent = 0
              }
              break
        }
      }
    }
}