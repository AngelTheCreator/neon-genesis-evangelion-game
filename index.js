//Select the canvas tag with query selector
const canvas = document.querySelector('canvas');
/*canvas.getContext('2d'); is basically telling JS that
the context of the drawing is going to be 2 dimensional.
you could also put is as canvas.getContext('3d'); in order to
get a three dimendional context. The 'c' variable is made to store the
2d context */
const c = canvas.getContext('2d');

//this width and height can adjust to many types of screen size
canvas.width = 1024;
canvas.height = 576;

/* The the fillRect() method, draws a filled rectangle, it takes 4 variables 
(x coordinates, y coordinates, width and height) */
c.fillRect(0, 0, c.width, c.height); 

const gravity = 0.7;

//We create a class method called 'Sprite' in order to create the 'blueprint' for the characters on screen.
class Sprite {
    constructor({position, velocity, color, offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey 
        this.attackBox = {
            position: {
                x: this.position.x,
                y:this.position.y
            },
            offset,
            width: 100 ,
            height: 50 
        }
        this.color = color
        this.isAttacking
    }

    draw(){
        //This is where we draw the characters
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //This is where we draw the attackBox
        //if(this.isAttacking){ 
        c.fillStyle = '#52d053';
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        //}
    }
    update(){
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
         
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity
    }
    attack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}


//Create the player.
const player = new Sprite({
    position: {
    x: 0,
    y: 0
},
    velocity: {
        x: 0,
        y: 0
    },
    color: '#765898',
    offset: {
        x: 0,
        y: 0
    }
})


//Create the enemy.
const enemy = new Sprite({
    position: {
    x: 400,
    y: 100
},
    velocity: {
        x: 0,
        y: 0
    },
    color: 'grey',
    offset: {
        x: -50,
        y:0
    }
})




console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }, 
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

let lastKey

function rectangularCollision({rectangle1,rectangle2}){
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= 
        rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y 
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height  
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    c.clearRect(0, 0 , canvas.width, canvas.height)
    player.update()
    enemy.update()
    
    //player movement
    player.velocity.x = 0
    if(keys.a.pressed && lastKey === 'a'){
        player.velocity.x = -4
    }else if(keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 4
    }
    //enemy movement
    enemy.velocity.x = 0
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -4
    }else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 4
    }
    // Collision detection
    if(
        rectangularCollision({
            rectangle1: player, 
            rectangle2: enemy
        }) &&
        player.isAttacking

     ) {
         player.isAttacking = false;
        console.log('player attack successful');
    }

    if(
        rectangularCollision({
            rectangle1: enemy, 
            rectangle2: player
        }) &&
        enemy.isAttacking

     ) {
         enemy.isAttacking = false;
        console.log('enemy attack successful');
    }
}

animate();

window.addEventListener('keydown', (event) => {
    console.log(event.key);
    switch(event.key) {
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
        break

        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
        break

        case 'w':
           player.velocity.y = -20
        break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
        break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
        break

        case 'ArrowUp':
           enemy.velocity.y = -20
        break

        case ' ':
            player.attack()
        break

        case 'ArrowDown':
            enemy.attack()
        break
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'd':
            keys.d.pressed = false
        break

        case 'a':
            keys.a.pressed = false
        break

        case 'w':
            keys.w.pressed = false
        break
    }

    switch(event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
        break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
        break

        case 'ArrowUp':
            keys.ArrowUp.pressed = false
        break
    }
})