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
        y: 224
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
        y: 155
    },
    sprites: {
        idle: {
            imageSrc: './imgs/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './imgs/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './imgs/samuraiMack/Jump.png',
            framesMax: 2
        }, 
        fall: {
            imageSrc: './imgs/samuraiMack/Fall.png',
            framesMax: 2
        }, 
        attack1: {
            imageSrc: './imgs/samuraiMack/Attack1.png',
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
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './imgs/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 187,
        x2: 63,
        y: 170
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
        }
    },
    attackBox: {
        offset: {
            x: 0,
            y: 0
        },
        width: 100,
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
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
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
    // if (player.position.y < enemy.position.y) {
    //     player.attackBox.offset.x = 50
    //     enemy.attackBox.offset.y = -50
    //     enemy.attackBox.offset.x = 0
    //     //find better way to do this
    //     player.attackBox.width = 50
    //     player.attackBox.height = 100
    //     enemy.attackBox.width = 50
    //     enemy.attackBox.height = 100
    // } else if (player.position.y > enemy.position.y) {
    //     player.attackBox.offset.y = -50
    //     player.attackBox.offset.x = 0
    //     enemy.attackBox.offset.x = 50
    //     //find better way to do this
    //     player.attackBox.width = 50
    //     player.attackBox.height = 100
    //     enemy.attackBox.width = 50
    //     enemy.attackBox.height = 100
    // } else if (player.position.x > enemy.position.x) {

    // to be actually used
    // if (player.position.x > enemy.position.x) {
    //     player.attackBox.offset.x = -50
    //     enemy.attackBox.offset.x = 0
    //     player.attackBox.offset.y = 0
    //     enemy.attackBox.offset.y = 0
    // } else {
    //     player.attackBox.offset.x = 0
    //     enemy.attackBox.offset.x = -50
    //     player.attackBox.offset.y = 0
    //     enemy.attackBox.offset.y = 0
    // }
    background.update()
    shop.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    // player movement
    if (keys.a.pressed && player.lastKey === 'a' && player.position.x > 0) {
        player.velocity.x = -player.xspeed
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd' && player.position.x + player.offset.x2< canvas.width - player.width) {
        player.velocity.x = player.xspeed
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }

    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }
    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && enemy.position.x > 0) {
        enemy.velocity.x = -enemy.xspeed
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && enemy.position.x + enemy.offset.x2 < canvas.width - enemy.width) {
        enemy.velocity.x = enemy.xspeed
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }

    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    //detect collision yas
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttacking &&
    player.framesCurrent === 4) {
            console.log("yas")
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
    }) && enemy.isAttacking) {
            console.log("enemy attack yas")
            player.takeHit()
            enemy.isAttacking = false // immediately sets is attacking to false again to allow for only one hit at a time
            document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId })
    }
}

animate()

window.addEventListener('keydown', (event) => {
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
        case ' ':
            player.attack()
            break
        // enemy keys
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
})