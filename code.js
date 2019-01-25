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
 * Public Variables
 */
var ctx;


/**
 * Circle Spawning
 */
BigCircleStart = function(ctx,x, y, color, circleSize) {
    ctx.beginPath();
    ctx.arc(x, y, circleSize, 0, Math.PI * 2, true);
    ctx.fillStyle=color
    ctx.fill();
    ctx.closePath();
    this.clicked=function(){
        console.log("Start Clicked")
        //ctx.fillStyle='#ff0000'
        //ctx.fill();
        timer();
    }
};

BigCircleEnd = function(ctx,x, y, color, circleSize) {
    ctx.beginPath();
    ctx.arc(x, y, circleSize, 0, Math.PI * 2, true);
    ctx.fillStyle=color
    ctx.fill();
    ctx.closePath();
    this.clicked=function(){
        console.log("End Clicked")
        //ctx.fillStyle='#ff0000'
        //ctx.fill();
        stopTimer();
    }
};




/**
 * Document initilization
 */
function init() {
  var canvas = document.getElementsByTagName("canvas")[0];
  // Set canvas to device size
  var timerHeight = document.getElementById('timer').offsetHeight;
  //console.log(offsetHeight);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - timerHeight;
  var width = canvas.width;
  var height = canvas.height;
  // Generate coords to spawn the circle within canvas bounds
  var randomXStart = getRandomInRange(CIRCLE_WIDTH, width - CIRCLE_WIDTH);
  var randomYStart = getRandomInRange(CIRCLE_WIDTH + timerHeight, height - CIRCLE_WIDTH - timerHeight);

  var randomXEnd = getRandomInRange(CIRCLE_WIDTH, width - CIRCLE_WIDTH);
  var randomYEnd = getRandomInRange(CIRCLE_WIDTH + timerHeight, height - CIRCLE_WIDTH - timerHeight);

  ctx = canvas.getContext('2d');
  var bigGreen = new BigCircleStart(ctx,randomXStart, randomYStart, '#5eb62b', CIRCLE_WIDTH);
  var bigGreen2 = new BigCircleEnd(ctx, randomXEnd, randomYEnd, '#ff0000', CIRCLE_WIDTH)
  $('#canvas').click(function(e){
    var x = e.clientX;
	var y = e.clientY - timerHeight * 2;
    if(Math.pow(x-randomXStart,2)+Math.pow(y-randomYStart,2) < Math.pow(CIRCLE_WIDTH,2))   
      bigGreen.clicked();

    if(Math.pow(x-randomXEnd,2)+Math.pow(y-randomYEnd,2) < Math.pow(CIRCLE_WIDTH,2))   
    bigGreen2.clicked();
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