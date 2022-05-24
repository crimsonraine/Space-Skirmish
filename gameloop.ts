// Main "boilerplate" code for a game loop. Unlikely to need to change this.

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const FRAME_LENGTH = 30
const characterList = new CharacterList();

//Draw ~ 30 times a second
let drawIntervalId : number | undefined = window.setInterval(draw, FRAME_LENGTH);

function draw(){
    // Clear the stage!
    ctx.clearRect(0,0,canvas.width, canvas.height); // somehow get this to clear the images

    // Re-draw all the characters!
    for (const character of characterList.characters){
        character.draw();
    }

    //Update all characters
    for (const character of characterList.characters){
        character.update();
    }
}

// Functions to control (pause/continue) the game loop.

function pauseDrawing(){
    if (drawIntervalId !== undefined)
        clearInterval(drawIntervalId);
    drawIntervalId = undefined;
}

function continueDrawing(){
    if (drawIntervalId === undefined)
        drawIntervalId = window.setInterval(draw, FRAME_LENGTH);
}

(document.querySelector("#pause") as HTMLElement).addEventListener("click",pauseDrawing);
(document.querySelector("#continue") as HTMLElement).addEventListener("click",continueDrawing);
