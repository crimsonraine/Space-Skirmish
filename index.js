const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
// canvas.width = window.innerWidth
// canvas.height = window.innerHeight
canvas.width = 1024
canvas.height = 576

c.fillRect(0,0, canvas.width, canvas.height)
const gravity = 0.7
const xxspeed = 10
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './imgs2/background_galaxy.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 143
    },
    imageSrc: './imgs2/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: './imgs2/Knight_Char/Idle.png',
    framesMax: 11,
    scale: 2.5,
    offset: {
        x: 187,
        x2: 55,
        y: 215
    },
    sprites: {
        idle: {
            imageSrc: './imgs2/Knight_Char/Idle.png',
            framesMax: 11
        },
        run: {
            imageSrc: './imgs2/Knight_Char/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './imgs2/Knight_Char/Jump.png',
            framesMax: 3
        }, 
        fall: {
            imageSrc: './imgs2/Knight_Char/Fall.png',
            framesMax: 3
        }, 
        attack1: {
            imageSrc: './imgs2/Knight_Char/Attack1.png',
            framesMax: 7
        },
        attack2: {
            imageSrc: './imgs2/Knight_Char/Attack2.png',
            framesMax: 7
        },
        takeHit: {
            imageSrc: './imgs2/Knight_Char/Take Hit.png',
            framesMax: 4
        }, 
        death: {
            imageSrc: './imgs2/Knight_Char/Death.png',
            framesMax: 11
        },
        idleFlip: {
            imageSrc: './imgs2/KnightFlip/Idle.png',
            framesMax: 11
        },
        runFlip: {
            imageSrc: './imgs2/KnightFlip/Run.png',
            framesMax: 8
        },
        jumpFlip: {
            imageSrc: './imgs2/KnightFlip/Jump.png',
            framesMax: 3
        }, 
        fallFlip: {
            imageSrc: './imgs2/KnightFlip/Fall.png',
            framesMax: 3
        }, 
        attack1Flip: {
            imageSrc: './imgs2/KnightFlip/Attack1.png',
            framesMax: 7
        },
        takeHitFlip: {
            imageSrc: './imgs2/KnightFlip/Take Hit.png',
            framesMax: 4
        }, 
        deathFlip: {
            imageSrc: './imgs2/KnightFlip/Death.png',
            framesMax: 11
        }
    },
    attackBox: {
        offset: {
            x: 80,
            y: -20
        },
        width: 60,
        height: 50
    }
})

const enemy = new Fighter({
    position: {
        x: 900,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    imageSrc: './imgs2/Fantasy_Fighter_Char/Idle.png',
    framesMax: 10,
    scale: 2.5,
    offset: {
        x: 167,
        x2: 63,
        y: 183
    },
    sprites: {
        idle: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Idle.png',
            framesMax: 10
        },
        run: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Jump.png',
            framesMax: 3
        }, 
        fall: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Fall.png',
            framesMax: 3
        }, 
        attack1: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Attack1.png',
            framesMax: 7
        }, 
        attack2: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Attack2.png',
            framesMax: 8
        }, 
        takeHit: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Take hit.png',
            framesMax: 3
        }, 
        death: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Death.png',
            framesMax: 7
        },
        idleFlip: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Idle.png',
            framesMax: 10
        },
        runFlip: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Run.png',
            framesMax: 8
        },
        jumpFlip: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Jump.png',
            framesMax: 3
        }, 
        fallFlip: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Fall.png',
            framesMax: 3
        }, 
        attack1Flip: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Attack1.png',
            framesMax: 7
        }, 
        attack2Flip: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Attack2.png',
            framesMax: 8
        },
        takeHitFlip: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Take hit.png',
            framesMax: 3
        }, 
        deathFlip: {
            imageSrc: './imgs2/Fantasy_Fighter_Char/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: 50,
            y: -26
        },
        width: 118,
        height: 50
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}
let lastKey

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}
function attackBoxChange({ player1, player2}) {
    if (player1.position.y < player2.position.y) {
        player1.attackBox.offset.y = -200
        player2.attackBox.offset.y = 200
    } else if (player1.position.y > player2.position.y) {
        player1.attackBox.offset.y = 200
        player2.attackBox.offset.y = -200
    } else if (player1.position.x > player2.position.x) {
        player1.attackBox.offset.x = -50
        player2.attackBox.offset.x = 0
    } else {
        player1.attackBox.offset.x = 0
        player2.attackBox.offset.x = -50
    }
}

function determineWinner({ player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display='flex'
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
        player.takeHit(5)
        enemy.takeHit(5)
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
        enemy.takeHit(5)
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
        player.takeHit(5)
    }
}

let timer = 60
let timerId
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        determineWinner({player,enemy, timerId})
    }
}
decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    background.update()
    shop.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    // player movement
    if (keys.a.pressed && player.lastKey === 'a' && player.position.x > 0) {
        player.velocity.x = -player.xspeed
        player.actionName = 'run'
        // player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd' && player.position.x + player.offset.x2< canvas.width - player.width) {
        player.velocity.x = player.xspeed
        player.actionName = 'run'
        // player.switchSprite('run')
    } else {
        player.actionName = 'idle'
        // player.switchSprite(player.actionName)
    }

    if (player.velocity.y < 0) {
        player.actionName = 'jump'
        // player.switchSprite(player.actionName)
    } else if (player.velocity.y > 0) {
        player.actionName = 'fall'
        // player.switchSprite(player.actionName)
    }
    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && enemy.position.x > 0) {
        enemy.velocity.x = -enemy.xspeed
        enemy.actionName = 'run'
        // enemy.switchSprite(enemy.actionName)
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && enemy.position.x + enemy.offset.x2 < canvas.width - enemy.width) {
        enemy.velocity.x = enemy.xspeed
        enemy.actionName = 'run'
        // enemy.switchSprite('run')
    } else {
        enemy.actionName = 'idle'
        // enemy.switchSprite(enemy.actionName)
    }

    if (enemy.velocity.y < 0) {
        enemy.actionName = 'jump'
        // enemy.switchSprite(enemy.actionName)
    } else if (enemy.velocity.y > 0) {
        enemy.actionName = 'fall'
        // enemy.switchSprite(enemy.actionName)
    }

    // to be actually used
    if (player.position.x > enemy.position.x) {
        player.switchSprite2(player.actionName)
        enemy.switchSprite2(enemy.actionName)
        player.attackBox.offset.x = -20
        enemy.attackBox.offset.x = -50
    } else {
        player.switchSprite(player.actionName)
        enemy.switchSprite(enemy.actionName)
        player.attackBox.offset.x = 80
        enemy.attackBox.offset.x = 50
    }

    //detect collision yas & enemy hit
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttacking &&
    player.framesCurrent === 4) {
            enemy.takeHit()
            player.isAttacking = false // immediately sets is attacking to false again to allow for only one hit at a time
            document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    // if player misses
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false
    }

    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && enemy.isAttacking &&
    enemy.framesCurrent === 5) {
            player.takeHit()
            enemy.isAttacking = false // immediately sets is attacking to false again to allow for only one hit at a time
            document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    // if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 5) {
        enemy.isAttacking = false
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId })
    }
}

animate()

window.addEventListener('keydown', (event) => {
    // player keys
    if (!player.dead) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                break
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                break
            case 'w':
                if (player.jump == 0)
                    player.velocity.y = -15
                else if (player.jump == 1)
                    player.velocity.y = -12
                player.jump++
                break
            case 's':
                if (!player.cooldown) player.attack()
                break
        }

    }
    // enemy keys
    if (!enemy.dead) {
        switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            if (enemy.jump == 0)
                enemy.velocity.y = -15
            else if (enemy.jump == 1)
                enemy.velocity.y = -12
            enemy.jump++
            break
        case 'ArrowDown':
            if (!enemy.cooldown) enemy.attack()
            break

    }
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            setTimeout(() => {
                player.cooldown = false
            }, 500)
            break
        // case 'w':
        //     keys.w.pressed = false
        //     break
        // enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowDown':
            setTimeout(() => {
                enemy.cooldown = false
            }, 500)
            break
        // case 'ArrowUp':
        //     keys.ArrowUp.pressed = false
        //     break

    }
});

let drawAnimationFrameID = requestAnimationFrame(draw);
// Functions to control (pause/continue) the game loop.

function pauseDrawing(){
    if (drawAnimationFrameID !== undefined) cancelAnimationFrame(drawAnimationFrameID);
    drawAnimationFrameID = undefined;
}

function continueDrawing(){
    if (drawAnimationFrameID === undefined) drawAnimationFrameID = requestAnimationFrame(draw);
}

document.querySelector("#pause").addEventListener("click",pauseDrawing);
document.querySelector("#continue").addEventListener("click",continueDrawing);