const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const FRAME_LENGTH = 30;
const characterList = new CharacterList();

function draw(time :number){
    // Clear the stage!
    ctx.clearRect(0,0,canvas.width, canvas.height); // somehow get this to clear the images

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 7/8 * canvas.height, canvas.width, 1/8 * canvas.height); // we can change this later to an image

    // Re-draw all the characters!
    for (const character of characterList.characters){
        character.draw();
    }

    // Update all characters
    for (const character of characterList.characters){
        character.update();
    }
    let drawAnimationFrameID = requestAnimationFrame(draw);

    // Stats
    for (let char = 0; char <= Character.length; char++) {
        ctx.strokeRect(400 / char + 50, 50, 100, 10) // would need to tinker with the numbers
    }
}