// Some standard user-input events. Define handling of these events here.

// test character, gotta change all the methods below.
let player : Character = new Character(canvas.width / 2, canvas.height - 100, 'imgs/kombatchar.png', 'imgs/kombatchar.png', true);
let player2 : Character = new Character(canvas.width / 4, canvas.height - 100, 'imgs/kombatchar.png', 'imgs/kombatchar.png', true);

window.addEventListener("load", function() {
    //Handle when the whole page finishes loading
    //Use this to "set up" the initial state of things;

    //Often, this includes populating the characterList.
    // A sample:
    characterList.addCharacter(player);
    characterList.addCharacter(player2)

    // let rock : Rock = new Rock(canvas.width / 2, 10);
    // characterList.addCharacter(rock);
    // let fruit : Fruit = new Fruit(canvas.width / 2, 100);
    // characterList.addCharacter(fruit);

})

canvas.addEventListener("click", function(event: MouseEvent) {
    //Handle click events
    //Get position of click on canvas: event.offsetX, event.offsetY
});

document.addEventListener("keydown", function(event: KeyboardEvent){
    //Handle keydown events
    //Get the key that was pressed: event.key
    if (event.key === "ArrowLeft")
        player.moveLeft();
    if (event.key === "ArrowRight")
        player.moveRight();
    if (event.key === "ArrowUp")
        player2.moveUp();
    if (event.key === "a")
        player2.moveLeft();
    if (event.key === "d")
        player2.moveRight();
    if (event.key === "w")
        player2.moveUp();
        
});

document.addEventListener("keyup", function(event:KeyboardEvent){
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