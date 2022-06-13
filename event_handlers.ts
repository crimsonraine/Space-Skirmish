// Some standard user-input events. Define handling of these events here.

// test character, gotta change all the methods below.
let player : Character = new Character(canvas.width / 2, canvas.height - 100, 'imgs/kombatchar.png', 'imgs/kombatchar.png', true);
let player2 : Character = new Character(canvas.width / 4, canvas.height - 100, 'imgs/character2.png', 'imgs/character2.png', true);

window.addEventListener("load", function() {
    ctx.style = "background: url('./imgs/Krossroads.jpg')"
    // characterList.addCharacter(player);
    // characterList.addCharacter(player2)
})

canvas.addEventListener("click", function(event: MouseEvent) {
    //Get position of click on canvas: event.offsetX, event.offsetY
});

document.addEventListener("keydown", function (event) {
    //Handle keydown events
    //Get the key that was pressed: event.key
<<<<<<< HEAD
    switch(event.key) {
        case 'j':
            player.leftPress = true;
            break;
        case 'l':
            player.rightPress = true;
            break;
        case 'i':
            player.moveUp();
            break;
        case 'c':
            player.atk(player2);
            break;
        case 'a':
            player2.leftPress = true;
            break;
        case 'd':
            player2.rightPress = true;
            break;
        case 'w':
            player2.moveUp();
            break;
        case 'n':
            player2.atk(player);
            break;
=======
    if (event.key === "ArrowLeft")
        player.leftPress = true
    if (event.key === "ArrowRight")
        player.rightPress = true
    if (event.key === "ArrowUp"){
        if (!event.repeat)
            player.moveUp();
    }
    if (event.key === "a")
        player2.leftPress = true
    if (event.key === "d")
        player2.rightPress = true
    if (event.key === "w"){
        if (!event.repeat)
            player2.moveUp();
>>>>>>> efdb5f343f42c5fe1d7f6cb56e7698856e5ef870
    }
});
document.addEventListener("keyup", function (event) {
    switch(event.key) {
        case 'j':
            player.leftPress = false;
            break;
        case 'l':
            player.rightPress = false;
            break;
        case 'a':
            player2.leftPress = false;
            break;
        case 'd':
            player2.rightPress = false;
            break;
    }
});


// Add more event handlers:

// Examples include:
// canvas.addEventListener("mousemove",function(event: MouseEvent) {...});
// canvas.addEventListener("mousedown",function(event: MouseEvent) {...});
// canvas.addEventListener("mouseup",function(event: MouseEvent) {...});

// Use setTimeout() for time-based events that will occur once
// Use setInterval() for time-based events that will occur regularly


//Define any global variables for tracking input states between events:
// Some samples:
// let lastMousePosition = {x: 0, y:0};
// let keysStatus = {leftKeyDown: false, rightKeyDown: false};

// setInterval( function() {
//     characterList.addCharacter( new Fruit( Math.random() * canvas.width, -50));
// }, 2000)

// setTimeout(createRock, Math.random() * 2000 + 1000);

// function createRock(){
//     characterList.addCharacter( new Rock( Math.random() * canvas.width, -50));
//     setTimeout(createRock, Math.random() * 2000 + 1000);
// }

// end of game code
//if (player2.health <= 0 || player.health <= 0) {