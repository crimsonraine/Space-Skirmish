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
    imageSrc: './imgs/shop.png',
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
    imageSrc: './imgs/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 187,
        x2: 45,
        y: 235
    },
    sprites: {
        idle: {
            imageSrc: './Knight_Char/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './Knight_Char/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './Knight_Char/Jump.png',
            framesMax: 2
        }, 
        fall: {
            imageSrc: './Knight_Char/Fall.png',
            framesMax: 2
        }, 
        attack1: {
            imageSrc: './Knight_Char/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: './Knight_Char/Take Hit.png',
            framesMax: 4
        }, 
        death: {
            imageSrc: './Knight_Char/Death.png',
            framesMax: 6
        },
        idleFlip: {
            imageSrc: './Knight_Char/Idle.png',
            framesMax: 8
        },
        runFlip: {
            imageSrc: './Knight_Char/Run.png',
            framesMax: 8
        },
        jumpFlip: {
            imageSrc: './Knight_Char/Jump.png',
            framesMax: 2
        }, 
        fallFlip: {
            imageSrc: './Knight_Char/Fall.png',
            framesMax: 2
        }, 
        attack1Flip: {
            imageSrc: './Knight_Char/Attack1.png',
            framesMax: 6
        },
        takeHitFlip: {
            imageSrc: './Knight_Char/Take Hit.png',
            framesMax: 4
        }, 
        deathFlip: {
            imageSrc: './Knight_Char/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
    }
})

const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    imageSrc: './imgs/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 187,
        x2: 63,
        y: 250
    },
    sprites: {
        idle: {
            imageSrc: './imgs/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './imgs/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './imgs/kenji/Jump.png',
            framesMax: 2
        }, 
        fall: {
            imageSrc: './imgs/kenji/Fall.png',
            framesMax: 2
        }, 
        attack1: {
            imageSrc: './imgs/kenji/Attack1.png',
            framesMax: 4
        }, 
        takeHit: {
            imageSrc: './imgs/kenji/Take hit.png',
            framesMax: 3
        }, 
        death: {
            imageSrc: './imgs/kenji/Death.png',
            framesMax: 7
        },
        idleFlip: {
            imageSrc: './imgs/kenjiFlip/Idle.PNG',
            framesMax: 4
        },
        runFlip: {
            imageSrc: './imgs/kenjiFlip/Run.PNG',
            framesMax: 8
        },
        jumpFlip: {
            imageSrc: './imgs/kenjiFlip/Jump.PNG',
            framesMax: 2
        }, 
        fallFlip: {
            imageSrc: './imgs/kenjiFlip/Fall.PNG',
            framesMax: 2
        }, 
        attack1Flip: {
            imageSrc: './imgs/kenjiFlip/Attack1.PNG',
            framesMax: 4
        }, 
        takeHitFlip: {
            imageSrc: './imgs/kenjiFlip/Take hit.PNG',
            framesMax: 3
        }, 
        deathFlip: {
            imageSrc: './imgs/kenjiFlip/Death.PNG',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
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
        player.attackBox.offset.x = -170
        enemy.attackBox.offset.x = 100
    } else {
        player.switchSprite(player.actionName)
        enemy.switchSprite(enemy.actionName)
        player.attackBox.offset.x = 100
        enemy.attackBox.offset.x = -170
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
    enemy.framesCurrent === 2) {
            player.takeHit(0.5)
            enemy.isAttacking = false // immediately sets is attacking to false again to allow for only one hit at a time
            document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    // if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
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
                player.attack()
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
            enemy.attack()
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