let canvas;
let ctx;
let canvasWidth = 1400;
let canvasHeight = 720; // 1000
let keys = [];

document.addEventListener('DOMContentLoaded', SetupCanvas);

function SetupCanvas() {
	canvas = document.getElementById('my-canvas');
	ctx = canvas.getContext('2d');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ship = new Ship();

	document.body.addEventListener("keydown", function (e) {
		keys[e.keyCode] = true;
	});
	document.body.addEventListener("keyup", function (e) {
		keys[e.keyCode] = false;
	});
	Render();
}

class Ship {
	constructor() {
		this.visible = true;
		this.x = canvasWidth / 2;
		this.y = canvasHeight / 2;
		this.movingForward = false;
		this.speed = 0.1
		this.velX = 0;
		this.velY = 0;
		this.rotateSpeed = 0.001;
		this.radius = 15;
		this.angle = 0;
		this.strokeColor = 'white';
	}

	Rotate(dir) {
		this.angle += this.rotateSpeed * dir;
	}

	Update() {
		let radians = this.angle / Math.PI * 180;
		if (this.movingForward) {
			this.velX += Math.cos(radians) * this.speed;
			this.velY += Math.sin(radians) * this.speed;
		}
		if (this.x < this.radius) {
			this.x = canvas.width;
		}
		if (this.x > canvas.width) {
			this.x = this.radius;
		}
		if (this.y < this.radius) {
			this.y = canvas.height;
		}
		if (this.y > canvas.height) {
			this.y = this.radius;
		}
		this.velX *= 0.99;
		this.velY *= 0.99;

		this.x -= this.velX;
		this.y -= this.velY;
	}

	Draw() {
		ctx.strokeStyle = this.strokeColor;
		ctx.beginPath();
		let vertAngle = ((Math.PI * 2) / 3);
		let radians = this.angle / Math.PI * 180;
		for (let i = 0; i < 3; i++) {
			ctx.lineTo(
				this.x - this.radius * Math.cos(vertAngle * i + radians),
				this.y - this.radius * Math.sin(vertAngle * i + radians)
			);
		}
		ctx.closePath();
		ctx.stroke();
	}
}

function Render() {
	//left = 37; up = 38; right = 39; down = 40;
	ship.movingForward = (keys[38]);
	if (keys[39]) {
		ship.Rotate(1); //rotate right
	}
	if (keys[37]) {
		ship.Rotate(-1); //rotate left
	}
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ship.Update();
	ship.Draw();
	requestAnimationFrame(Render);
}
