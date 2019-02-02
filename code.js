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
var times = [], trials = [], final_list = [];
var dists = [100,200,400], widths = [100,200,300];
var lastRand, ctx, randomXEnd, randomYEnd, randomXStart, randomYStart, canvas, width, height, bigGreen, bigGreen2, trialNumber, _width, _dist;

$(document).ready(function() {
  var _done, _start, _end;
  _done = _start = _end = 0;
  init();
  generatePoints();

  $('#canvas').click(function(e){
    var x = e.clientX, y = e.clientY, holder = "";

    if(Math.pow(x-randomXStart,2)+Math.pow(y-randomYStart,2) < Math.pow(_width/2,2)){
      bigGreen.clicked();
      _start = 1;
    } 

    if(Math.pow(x-randomXEnd,2)+Math.pow(y-randomYEnd,2) < Math.pow(_width/2,2)){
      if(_start == 1){
        holder = bigGreen2.clicked();
        times.push([trialNumber, holder]);
        _end = 1;
      }
    }

    if(_start == 1 && _end == 1){
      _start = _end = 0;
      //change 10 to 1 for full trials
      trialNumber+=10;
      //generates next trial
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
        timer();
        ctx.beginPath();
        ctx.arc(x, y, circleSize, 0, Math.PI * 2, true);
        ctx.fillStyle="#000000";
        ctx.fill();
        ctx.closePath();
    }
};

BigCircleEnd = function(ctx,x, y, color, circleSize) {
    ctx.beginPath();
    ctx.arc(x, y, circleSize, 0, Math.PI * 2, true);
    ctx.fillStyle=color
    ctx.fill();
    ctx.closePath();
    this.clicked=function(){
        var _time = stopTimer();
        ctx.beginPath();
        ctx.arc(x, y, circleSize, 0, Math.PI * 2, true);
        ctx.fillStyle="#000000";
        ctx.fill();
        ctx.closePath();
        return _time;
    }
};

function init(){
  trialNumber = _width = _dist = 0;
  lastRand = -1;
  canvas = document.getElementsByTagName("canvas")[0];
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');
  generateList();
  shuffleTrials();
  _dist = trials[trialNumber][1];
  _width = trials[trialNumber][2];
}

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function resetCanvas(){
  ctx.clearRect(0, 0, width, height);
}

function generatePoints(){
  var randStart = getRandomInRange(0,4);  
  var rand;

  //ensure the next trial starts in a different corner
  while(randStart == lastRand){
    randStart = getRandomInRange(0,4);
  }

  if(randStart < 1){
    randomXStart = _width + PADDING;
    randomYStart = _width + PADDING;
    rand = getRandomInRange(1,_dist - 1 + _width);
    randomXEnd = randomXStart + rand + PADDING;
    randomYEnd = randomYStart + Math.sqrt( Math.pow(_dist + _width,2) - Math.pow(rand,2) ) + PADDING;
  } else if(randStart < 2){
    randomXStart = _width + PADDING;
    randomYStart = height - _width - PADDING;
    rand = getRandomInRange(1,_dist - 1 + _width);
    randomXEnd = randomXStart + rand + PADDING;
    randomYEnd = randomYStart - Math.sqrt( Math.pow(_dist + _width,2) - Math.pow(rand,2) ) - PADDING;
  } else if(randStart < 3){
    randomXStart = width - _width - PADDING;
    randomYStart = _width + PADDING;
    rand = getRandomInRange(1,_dist - 1 + _width);
    randomXEnd = randomXStart - rand - PADDING;
    randomYEnd = randomYStart + Math.sqrt( Math.pow(_dist + _width,2) - Math.pow(rand,2) ) + PADDING;
  } else if(randStart < 4){
    randomXStart = width - _width - PADDING;
    randomYStart = height - _width - PADDING;
    rand = getRandomInRange(1,_dist  - 1 + _width);
    randomXEnd = randomXStart - rand - PADDING;
    randomYEnd = randomYStart - Math.sqrt( Math.pow(_dist + _width,2) - Math.pow(rand,2) ) - PADDING;
  }

  // widths[_width]/2 : function wants radius NOT diameter
  bigGreen = new BigCircleStart(ctx, randomXStart, randomYStart, '#5eb62b', _width/2);
  bigGreen2 = new BigCircleEnd(ctx, randomXEnd, randomYEnd, '#ff0000', _width/2);

  lastRand = randStart;
}

function nextTrial(){
  resetCanvas();
  if(trialNumber != 90){
    _dist = trials[trialNumber][1];
    _width = trials[trialNumber][2];
    generatePoints();
  } else {
    drawEnd();
    reorderData();
    alertData();
    sendMail();
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
  document.getElementById("output").innerHTML = times;
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffleTrials() {
    var j, x, i;
    for (i = trials.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = trials[i];
        trials[i] = trials[j];
        trials[j] = x;
    }
}

function generateList(){
  var l = 1;
  for(var i = 0; i < 3; i++){
    for(var j = 0; j < 3; j++){
      for(var k = 0; k < 10; k++){
        trials.push([l++, dists[j], widths[i]]);
      }
    }
  }
}

function reorderData(){
  //re-associate times with shuffled trials
  // change 9 to 90 for full trials
  for(var i = 0; i < 9; i++){
    final_list.push([trials[i][0], times[i][1]]);
  }

  //sort shuffled trials back in original order
  final_list = final_list.sort(function(a,b) { return a[0] - b[0]; });
}

function alertData(){
  var data = "";

  //build data string
  // change 9 to 90 for full trials
  for(var i = 0; i < 9; i++){
    data += final_list[i][0] + ".    " + (final_list[i][0] < 10 ? "  " : "") + final_list[i][1] + "\n";
  }

  alert(data);
  console.log(data);
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