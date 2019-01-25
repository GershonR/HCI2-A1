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

function init() {
  var canvas = document.getElementsByTagName("canvas")[0];
  var ctx = canvas.getContext('2d');
  var bigGreen = new BigCircle(ctx,50, 50, '#5eb62b', 50);
  $('#canvas').click(function(e){
    var x = e.clientX
      , y = e.clientY          
    if(Math.pow(x-50,2)+Math.pow(y-50,2) < Math.pow(50,2))   
      bigGreen.clicked()
  })    
}


$(document).ready(function() {
    init();   
});