var sketch = function(p)
{
  p.boids = []
  p.boidCount = 25
  p.max_speed = 2
  p.max_follow_speed = 8
  p.max_force = .5
  p.checkForMouse = false
  p.buffer = 10 // if the mouse inside the sketch and is this far from the edge or less, then ignore mouse input
  p.batchCount = 2 // separate boids into this many batches. each frame only calculates one batch instead of all boids, to improve performance
  p.currentBatch = 0
  p.pfollowMouse = false
  p.followMouse = false
  p.boidRadius = 8

  p.setup = function() {
    // p.myCanvas = p.createCanvas(300, 240);
    p.myCanvas = p.createCanvas(p.windowWidth*.2, p.windowHeight*.45);
    for (var i = 0; i < p.boidCount; ++i) {

      p.boids.push(new p.boid())
    }
    p.noStroke()
    p.background(0, 120, 125)

  }

  p.windowResized = function() {
    console.log(p.myCanvas)
    p.createCanvas(p.windowWidth*.2, p.windowHeight*.4);
  }

  p.mouseMoved = function()
  {
    p.checkForMouse = true
  }

  p.draw = function() {
    p.pfollowMouse = p.followMouse
    p.followMouse = p.checkForMouse && p.mouseX < p.width - p.buffer && p.mouseX > p.buffer && p.mouseY < p.height - p.buffer && p.mouseY > p.buffer
    if (!p.followMouse) {
      p.background(0, 90, 120, 40); // make background slightly transparent to create motion blur effect
    } else {
      p.background(0, 90, 120, 20); // make background more transparent when the boids are following the mouse
    }
    for (var i = 0; i < p.boidCount ; ++i) {
      if (!p.followMouse) {
          p.boids[i].followingMouse = false
          if (p.pfollowMouse) { // if the boid was following the mouse on the last frame
            p.boids[i].velocity.normalize()
            p.boids[i].velocity.mult(p.max_speed)
            p.boids[i].velocity.add(p.createVector(p.random(0.1) - 0.05, p.random(0.1) - 0.05))
          }
          p.boids[i].simpleMove()
      } else { // following mouse
        p.currentBatch = (p.currentBatch + 1) % p.batchCount
          p.boids[i].followingMouse = true
          if (i % p.batchCount != p.currentBatch) {
            p.boids[i].simpleMove()
          } else {
            p.boids[i].target = p.createVector(p.mouseX, p.mouseY)
            p.boids[i].integrateForces()
          }
      }
      p.boids[i].draw()
    }
  }

  p.getRandomTarget = function() {
    return p.createVector(p.random(p.width + 100) - 50, p.random(p.height + 100) - 50)
  }

  p.boid = function() {
    p.colorMode(p.HSB, 100)
    this.mycolor = p.color(p.random(20)+40,80,100)
    p.colorMode(p.RGB, 255)
    this.position = p.createVector(p.random(p.width), p.random(p.height))
    this.target = p.getRandomTarget()
    this.velocity = p.createVector(p.random(5)+5, p.random(2)-1)
    this.velocity.normalize()
    this.velocity.mult(p.max_speed)
    this.velocityDesired = p.createVector(0, 0)
    this.steering = p.createVector(0, 0)
    this.followingMouse = false

    this.integrateForces = function() {
      this.velocityDesired = p5.Vector.sub(this.target, this.position)
      // this.velocityDesired.normalize()
      // this.velocityDesired.mult(p.max_speed)
      this.velocityDesired.limit(p.max_follow_speed)
      this.steering = p5.Vector.sub(this.velocityDesired, this.velocity)
      this.steering.limit(p.max_force)
      this.velocity.add(this.steering)
      this.position.add(this.velocity)
    }

    this.simpleMove = function() {
      this.position.add(this.velocity)

      //check if position is outside of the canvas:
      if (this.position.x > p.width + p.boidRadius)  // off the right of the screen
        this.position.x = 0 - p.boidRadius
      if (this.position.y > p.height + p.boidRadius) // off the bottom of the screen
        this.position.y = 0 - p.boidRadius
      if (this.position.x < 0 - p.boidRadius)  // off the left of the screen
        this.position.x = p.width + p.boidRadius
      if (this.position.y < 0 - p.boidRadius) // off the top of the screen
        this.position.y = p.height + p.boidRadius
    }

    this.draw = function() {
      p.fill(this.mycolor)
      p.ellipse(this.position.x, this.position.y, 2*p.boidRadius, 2*p.boidRadius)
    }
  }
}
new p5(sketch, window.document.getElementById('boids'));
