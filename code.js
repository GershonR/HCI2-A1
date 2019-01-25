/**
 * HCI2 A1
 * Gershon Reydman
 * Eric Kulchycki
 * Anton Sawka
 */



/**
 * Constants
 */
const CIRCLE_WIDTH = 50;


/**
 * Circle Spawning
 */
BigCircle = function(ctx,x, y, color, circleSize) {
    ctx.beginPath();
    ctx.arc(x, y, circleSize, 0, Math.PI * 2, true);
    ctx.fillStyle=color
    ctx.fill();
    ctx.closePath();
    this.clicked=function(){
      ctx.fillStyle='#ff0000'
      ctx.fill();
	  alert("Clicked Circle");
    }
};

/**
 * Document initilization
 */
function init() {
  var canvas = document.getElementsByTagName("canvas")[0];
  // Set canvas to device size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var width = canvas.width;
  var height = canvas.height;
  // Generate coords to spawn the circle within canvas bounds
  var randomX = getRandomInRange(CIRCLE_WIDTH, width - CIRCLE_WIDTH);
  var randomY = getRandomInRange(CIRCLE_WIDTH, height - CIRCLE_WIDTH);
  var ctx = canvas.getContext('2d');
  var bigGreen = new BigCircle(ctx,randomX, randomY, '#5eb62b', CIRCLE_WIDTH);
  $('#canvas').click(function(e){
    var x = e.clientX
      , y = e.clientY          
    if(Math.pow(x-randomX,2)+Math.pow(y-randomY,2) < Math.pow(CIRCLE_WIDTH,2))   
      bigGreen.clicked()
  })    
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

$(document).ready(function() {
    init();   
});