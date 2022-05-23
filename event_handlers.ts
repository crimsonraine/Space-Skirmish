// Some standard user-input events. Define handling of these events here.

// test character, gotta change all the methods below.
let player : Character = new Character(canvas.width / 2, canvas.height - 20, 'kombatchar.png', 'kombatchar.png', true);

window.addEventListener("load", function() {
    //Handle when the whole page finishes loading
    //Use this to "set up" the initial state of things;

    //Often, this includes populating the actorList.
    // A sample:
    actorList.addActor(player);
    actorList.addActor(player2)

    // let rock : Rock = new Rock(canvas.width / 2, 10);
    // actorList.addActor(rock);
    // let fruit : Fruit = new Fruit(canvas.width / 2, 100);
    // actorList.addActor(fruit);

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
    if (event.key === "a")
        player2.moveLeft();
    if (event.key === "d")
        player2.moveRight();
        
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

setInterval( function() {
    actorList.addActor( new Fruit( Math.random() * canvas.width, -50));
}, 2000)

setTimeout(createRock, Math.random() * 2000 + 1000);

function createRock(){
    actorList.addActor( new Rock( Math.random() * canvas.width, -50));
    setTimeout(createRock, Math.random() * 2000 + 1000);
}