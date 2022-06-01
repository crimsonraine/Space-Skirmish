"use strict";
// Main "boilerplate" code for a game loop. Unlikely to need to change this.
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const FRAME_LENGTH = 30;
const characterList = new CharacterList();
// Draw ~ 30 times a second
// let drawIntervalId : number | undefined = window.setInterval(draw, FRAME_LENGTH);
function draw(time) {
    // Clear the stage!
    ctx.clearRect(0, 0, canvas.width, canvas.height); // somehow get this to clear the images
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 7 / 8 * canvas.height, canvas.width, 1 / 8 * canvas.height); // we can change this later to an image
    // Re-draw all the characters!
    for (const character of characterList.characters) {
        character.draw();
    }
    // Update all characters
    for (const character of characterList.characters) {
        character.update();
    }
    drawAnimationFrameID = requestAnimationFrame(draw);
    // Stats
    for (let char = 0; char <= Character.length; char++) {
        ctx.strokeRect(400 / char + 50, 50, 100, 10); // would need to tinker with the numbers
    }
}
let drawAnimationFrameID = requestAnimationFrame(draw);
// Functions to control (pause/continue) the game loop.
function pauseDrawing() {
    if (drawAnimationFrameID !== undefined)
        cancelAnimationFrame(drawAnimationFrameID);
    drawAnimationFrameID = undefined;
}
function continueDrawing() {
    if (drawAnimationFrameID === undefined)
        drawAnimationFrameID = requestAnimationFrame(draw);
}
document.querySelector("#pause").addEventListener("click", pauseDrawing);
document.querySelector("#continue").addEventListener("click", continueDrawing);
