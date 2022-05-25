"use strict";
// Some standard user-input events. Define handling of these events here.
// test character, gotta change all the methods below.
let player = new Character(canvas.width / 2, canvas.height - 100, 'imgs/kombatchar.png', 'imgs/kombatchar.png', true);
let player2 = new Character(canvas.width / 4, canvas.height - 100, 'imgs/character2.png', 'imgs/character2.png', true);
window.addEventListener("load", function () {
    characterList.addCharacter(player);
    characterList.addCharacter(player2);
});
canvas.addEventListener("click", function (event) {
    //Get position of click on canvas: event.offsetX, event.offsetY
});
document.addEventListener("keydown", function (event) {
    //Handle keydown events
    //Get the key that was pressed: event.key
    // Okay, so this is messed up. We should probably revert it to what we had before.
    switch (event.key) {
        case "ArrowLeft":
            player.moveLeft();
        case "ArrowRight":
            player.moveRight();
        case "ArrowUp":
            player.moveUp();
        case "a":
            player2.moveLeft();
        case "d":
            player2.moveRight();
        case "w":
            player2.moveUp();
    }
});
document.addEventListener("keyup", function (event) {
    //Handle keydown events
    //Get the key that was released: event.key
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
