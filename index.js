let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

canvas.width = 500
canvas.height = 400

let based = []

class Box {

    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.startTime = performance.now()
        this.start = null
        this.end = null
        this.distance = null
        this.elapsedTime = null
        this.t = null
        this.isAnimating = true
        this.duration = null
        this.currentTime = null
        this.color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
        based.push(this)
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    interpolateTo(x, y, duration) {
        this.start = { x: this.x, y: this.y }
        this.end = { x, y }
        this.distance = { x: this.end.x - this.start.x, y: this.end.y - this.start.y }
        this.duration = duration   
        this.isAnimating = true
    }

    animate = (currentTime) => {
        this.currentTime = currentTime

        this.elapsedTime = this.currentTime - this.startTime
        
        this.t = Math.min(1, this.elapsedTime / this.duration)
        this.x = this.start.x + this.distance.x * this.t
        this.y = this.start.y + this.distance.y * this.t
        if (this.t === 1) {
            this.isAnimating = false
        }
    }
}

function animate() {
    ctx.fillStyle = 'white'
    ctx.fillText(`box count: ${based.length}`, 10, 10)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    based.forEach(box => {
        box.interpolateTo(canvas.width / 2 - box.width / 2, canvas.height / 2 - box.height / 2, 1000)
        box.draw()
        if (box.isAnimating) {
            box.animate(performance.now())
        }
    });
    requestAnimationFrame(animate)
}

setInterval(() => {
    setTimeout(() => {
        new Box(Math.random()*canvas.height, Math.random()*canvas.width, 50, 50)
    }, 50);
}, 50);

requestAnimationFrame(animate)