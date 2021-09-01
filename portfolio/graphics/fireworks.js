// we'll keep track of a set of "fireworks"
let fireworks = [];
let particles = [];

/** @type {HTMLCanvasElement} */
let canvas = /** @type {HTMLCanvasElement} */ document.getElementById(
    'box2canvas'
);
let ctx = canvas.getContext('2d');

// Handle click event and adding point clicked to the list of fireworks
canvas.onclick = function (e) {
    // @ts-ignore
    let box = this.getBoundingClientRect();
    let mouseX = e.clientX - box.left;
    let mouseY = e.clientY - box.top;

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    fireworks.push({
        x: mouseX,
        y: box.bottom,
        destX: mouseX,
        destY: mouseY,
        speed: getRndInteger(-20, -1),
        color: randomColor,
    });
};

// make a random firework every 2 seconds
function randomFireWorks() {
    let x = getRndInteger(0, canvas.width);
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    fireworks.push({
        x: x,
        y: canvas.height,
        destX: x,
        destY: getRndInteger(0, canvas.height),
        speed: getRndInteger(-20, -1),
        color: randomColor,
    });

    setTimeout(randomFireWorks, 2000);
}

// generate a random int
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// animation loop to draw fireworks
function canvasAnimate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update the particles position
    particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.count++;

        // remove from list if past it's duration
        if (particle.count == particle.duration)
            delete particles[particles.indexOf(particle)];
    });

    // update the fireworks
    fireworks.forEach((firework) => {
        firework.y += firework.speed;

        // check if past or at destination height
        if (firework.y <= firework.destY) {
            // if so remove from list
            delete fireworks[fireworks.indexOf(firework)];
            // make the particles (random amount between 10 and 100)
            for (let i = 0; i < getRndInteger(10, 100); i++) {
                particles.push({
                    x: firework.x,
                    y: firework.y,
                    duration: getRndInteger(10, 60),
                    speedX: getRndInteger(-5, 5),
                    speedY: getRndInteger(-5, 5),
                    color: firework.color,
                    count: 0,
                });
            }
        }
    });

    // draw the fireworks
    fireworks.forEach((firework) => {
        ctx.fillStyle = '#' + firework.color;
        ctx.beginPath();
        ctx.arc(firework.x, firework.y, 10, 0, Math.PI * 2, false);
        ctx.fill();
    });

    // draw the particles
    particles.forEach((particle) => {
        // set the opacity to fade out as it gets closer to its duration
        ctx.globalAlpha = 1 - particle.count / particle.duration;
        ctx.fillStyle = '#' + particle.color;
        ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4);
        // reset opacity to not interfere with other colors
        ctx.globalAlpha = 1;
    });

    // loop
    window.requestAnimationFrame(canvasAnimate);
}
// start loops
canvasAnimate();
randomFireWorks();
