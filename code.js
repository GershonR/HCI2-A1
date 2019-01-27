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
var typeLog = [];
var trialCount = 0;
var currentWidth = 0;


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
		trialCount++;
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
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var width = canvas.width;
  var height = canvas.height;

  var randStart = getRandomInRange(0,4);
  if(randStart < 1){
    randomXStart = widths[currentWidth];
    randomYStart = widths[currentWidth];
    var rand = getRandomInRange(1,dists[0] - 1 + widths[currentWidth]);
    randomXEnd = randomXStart + rand;
    randomYEnd = randomYStart + Math.sqrt( Math.pow(dists[0] + widths[currentWidth],2) - Math.pow(rand,2) );
  } else if(randStart < 2){
    randomXStart = widths[currentWidth];
    randomYStart = height - widths[currentWidth];
    var rand = getRandomInRange(1,dists[0] - 1 + widths[currentWidth]);
    randomXEnd = randomXStart + rand;
    randomYEnd = randomYStart - Math.sqrt( Math.pow(dists[0] + widths[currentWidth],2) - Math.pow(rand,2) );
  } else if(randStart < 3){
    randomXStart = width - widths[currentWidth];
    randomYStart = widths[currentWidth];
    var rand = getRandomInRange(1,dists[0] - 1 + widths[currentWidth]);
    randomXEnd = randomXStart - rand;
    randomYEnd = randomYStart + Math.sqrt( Math.pow(dists[0] + widths[currentWidth],2) - Math.pow(rand,2) );
  } else if(randStart < 4){
    randomXStart = width - widths[currentWidth];
    randomYStart = height - widths[currentWidth];
    var rand = getRandomInRange(1,dists[0] - 1 + widths[currentWidth]);
    randomXEnd = randomXStart - rand;
    randomYEnd = randomYStart - Math.sqrt( Math.pow(dists[0] + widths[currentWidth],2) - Math.pow(rand,2) );
  }

  ctx = canvas.getContext('2d');
  var bigGreen = new BigCircleStart(ctx, randomXStart, randomYStart, '#5eb62b', widths[currentWidth]);
  var bigRed = new BigCircleEnd(ctx, randomXEnd, randomYEnd, '#ff0000', widths[currentWidth]);
  $('#canvas').click(function(e){
    var x = e.clientX;
    var y = e.clientY;
    if(Math.pow(x-randomXStart,2)+Math.pow(y-randomYStart,2) < Math.pow(widths[currentWidth],2))   
      bigGreen.clicked();

    if(Math.pow(x-randomXEnd,2)+Math.pow(y-randomYEnd,2) < Math.pow(widths[currentWidth],2)) {
      bigRed.clicked();
	  console.log(trialCount);
	  if(currentWidth == 0 && Math.floor(trialCount / 10) == 1)
		resetCanvas(ctx);
	  if(currentWidth == 1 && Math.floor(trialCount / 10) == 2)
		resetCanvas(ctx);
	  if(currentWidth == 2 && Math.floor(trialCount / 10) == 3)
		resetCanvas(ctx);
	}
  })
}

function resetCanvas(ctx) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	currentWidth++;
	init();
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

$(document).ready(function() {
	shuffle(dists);
	shuffle(widths);
    init();   
});