/**
 * HCI2 A1
 * Gershon Reydman
 * Eric Kulchycki
 * Anton Sawka
 */



/**
 * Constants
 */
const CIRCLE_WIDTH = 75;
const DIST = 500;

/**
 * Public Variables
 */
var ctx;
var dists = [400,500,600];
var widths = [75,100,125];


/**
 * Circle Spawning
 */
BigCircleS = function(ctx,x, y, color, circleSize) {
    ctx.beginPath();
    ctx.arc(x, y, circleSize, 0, Math.PI * 2, true);
    ctx.fillStyle=color
    ctx.fill();
    ctx.closePath();
    this.clicked=function(){
        console.log("Start Clicked")
        timer();
    }
};
BigCircleStart = function(ctx,x, y, color, circleSize) {
    ctx.beginPath();
    ctx.arc(x, y, circleSize, 0, Math.PI * 2, true);
    ctx.fillStyle=color
    ctx.fill();
    ctx.closePath();
    this.clicked=function(){
        console.log("Start Clicked")
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
        stopTimer();
    }
};




/**
 * Document initilization
 */
function init() {
  var distCheck = 0;
  var randomXEnd = 0;
  var randomYEnd = 0;
  var randomXStart = 0;
  var randomYStart = 0;
  var canvas = document.getElementsByTagName("canvas")[0];
  // Set canvas to device size
  //var timerHeight = document.getElementById('timer').offsetHeight;
  //console.log(offsetHeight);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;// - timerHeight;
  var width = canvas.width;
  var height = canvas.height;

  var randStart = getRandomInRange(0,4);
  if(randStart < 1){
    randomXStart = widths[0];
    randomYStart = widths[0];
    var rand = getRandomInRange(1,dists[0] - 1 + widths[0]);
    randomXEnd = randomXStart + rand;
    randomYEnd = randomYStart + Math.sqrt( Math.pow(dists[0] + widths[0],2) - Math.pow(rand,2) );
  } else if(randStart < 2){
    randomXStart = widths[0];
    randomYStart = height - widths[0];
    var rand = getRandomInRange(1,dists[0] - 1 + widths[0]);
    randomXEnd = randomXStart + rand;
    randomYEnd = randomYStart - Math.sqrt( Math.pow(dists[0] + widths[0],2) - Math.pow(rand,2) );
  } else if(randStart < 3){
    randomXStart = width - widths[0];
    randomYStart = widths[0];
    var rand = getRandomInRange(1,dists[0] - 1 + widths[0]);
    randomXEnd = randomXStart - rand;
    randomYEnd = randomYStart + Math.sqrt( Math.pow(dists[0] + widths[0],2) - Math.pow(rand,2) );
  } else if(randStart < 4){
    randomXStart = width - widths[0];
    randomYStart = height - widths[0];
    var rand = getRandomInRange(1,dists[0] - 1 + widths[0]);
    randomXEnd = randomXStart - rand;
    randomYEnd = randomYStart - Math.sqrt( Math.pow(dists[0] + widths[0],2) - Math.pow(rand,2) );
  }

  ctx = canvas.getContext('2d');
  var bigGreen = new BigCircleStart(ctx, randomXStart, randomYStart, '#5eb62b', widths[0]);
  var bigGreen2 = new BigCircleEnd(ctx, randomXEnd, randomYEnd, '#ff0000', widths[0]);
  $('#canvas').click(function(e){
    var x = e.clientX;
    var y = e.clientY;
    if(Math.pow(x-randomXStart,2)+Math.pow(y-randomYStart,2) < Math.pow(widths[0],2))   
      bigGreen.clicked();

    if(Math.pow(x-randomXEnd,2)+Math.pow(y-randomYEnd,2) < Math.pow(widths[0],2))   
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