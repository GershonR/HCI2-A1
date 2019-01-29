/**
 * HCI2 A1
 * Gershon Reydman
 * Eric Kulchycki
 * Anton Sawka
 */



/**
 * Constants
 */
const PADDING = 25;

/**
 * Public Variables
 */
var times = "";
var dists = [100,200,400];
var widths = [50,100,200];
var ctx, randomXEnd, randomYEnd, randomXStart, randomYStart, canvas, width, height, bigGreen, bigGreen2, trialNumber, _width, _dist;
trialNumber = _width = _dist = 0;

$(document).ready(function() {
  var _done, _start, _end;
  _done = _start = _end = 0;
  init();
  generatePoints(0,0);

  $('#canvas').click(function(e){
    var x = e.clientX, y = e.clientY;

    if(Math.pow(x-randomXStart,2)+Math.pow(y-randomYStart,2) < Math.pow(widths[0],2)){
      bigGreen.clicked();
      _start = 1;
    } 

    if(Math.pow(x-randomXEnd,2)+Math.pow(y-randomYEnd,2) < Math.pow(widths[0],2)){
      if(_start == 1){
        times += trialNumber + ".    " + (trialNumber < 10 ? "  " : "") + bigGreen2.clicked() + "\n";
        _end = 1;
      }
    }

    if(_start == 1 && _end == 1){
      _start = _end = 0;
      console.log("resetting canvas... " + trialNumber);
      trialNumber+=10;
      nextTrial();
    }
  })
});

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
        return stopTimer();
        stopTimer();
    }
};

function init(){
  canvas = document.getElementsByTagName("canvas")[0];
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');
}

function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function resetCanvas(){
  ctx.clearRect(0, 0, width, height);
}

function generatePoints(_width, _dist){
  var randStart = getRandomInRange(0,4);
  var rand;

  if(randStart < 1){
    randomXStart = widths[_width] + PADDING;
    randomYStart = widths[_width] + PADDING;
    rand = getRandomInRange(1,dists[_dist] - 1 + widths[_width]);
    randomXEnd = randomXStart + rand + PADDING;
    randomYEnd = randomYStart + Math.sqrt( Math.pow(dists[_dist] + widths[_width],2) - Math.pow(rand,2) ) + PADDING;
  } else if(randStart < 2){
    randomXStart = widths[_width] + PADDING;
    randomYStart = height - widths[_width] - PADDING;
    rand = getRandomInRange(1,dists[_dist] - 1 + widths[_width]);
    randomXEnd = randomXStart + rand + PADDING;
    randomYEnd = randomYStart - Math.sqrt( Math.pow(dists[_dist] + widths[_width],2) - Math.pow(rand,2) ) - PADDING;
  } else if(randStart < 3){
    randomXStart = width - widths[_width] - PADDING;
    randomYStart = widths[_width] + PADDING;
    rand = getRandomInRange(1,dists[_dist] - 1 + widths[_width]);
    randomXEnd = randomXStart - rand - PADDING;
    randomYEnd = randomYStart + Math.sqrt( Math.pow(dists[_dist] + widths[_width],2) - Math.pow(rand,2) ) + PADDING;
  } else if(randStart < 4){
    randomXStart = width - widths[_width] - PADDING;
    randomYStart = height - widths[_width] - PADDING;
    rand = getRandomInRange(1,dists[_dist] - 1 + widths[_width]);
    randomXEnd = randomXStart - rand - PADDING;
    randomYEnd = randomYStart - Math.sqrt( Math.pow(dists[_dist] + widths[_width],2) - Math.pow(rand,2) ) - PADDING;
  }

  // widths[_width]/2 : function wants radius NOT diameter
  bigGreen = new BigCircleStart(ctx, randomXStart, randomYStart, '#5eb62b', widths[_width]/2);
  bigGreen2 = new BigCircleEnd(ctx, randomXEnd, randomYEnd, '#ff0000', widths[_width]/2);
}

function nextTrial(){
  resetCanvas();
  switch(trialNumber){
    case 10:
      _dist = 1;  break;
    case 20:
      _dist = 2;  break;
    case 30:
      _dist = 0;  _width = 1; break;
    case 40:
      _dist = 1;  break;
    case 50:
      _dist = 2;  break;
    case 60:
      _dist = 0;  _width = 2; break;
    case 70:
      _dist = 1;  break;
    case 80:
      _dist = 2;  break;
    case 90:
      drawEnd();  console.log("Results:\n\n1. " + trialNumber); alert(times);  sendMail(); break; 
  }

  if(trialNumber != 90){
    generatePoints(_width,_dist);
  }
}

function drawEnd(){
  resetCanvas();
  ctx.beginPath();
  ctx.arc(width/2, height/2, 250, 0, Math.PI * 2, true);
  ctx.fillStyle="#ff00ff";
  ctx.fill();
  ctx.closePath();
  ctx.font = "40px Ariel";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Thank you for participating!",width/2,height/2);
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

function sendMail() {
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': '-ih3KTGkZNOIArHqT9bEHA',
        'message': {
          'from_email': 'erickulchycki@gmail.com',
          'to': [
              {
                'email': 'erickulchycki@gmail.com',
                'name': 'Eric Kulchycki',
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'Test Results',
          'html': times
        }
      }
     }).done(function(response) {
       console.log(response); // if you're into that sorta thing
     });
}
