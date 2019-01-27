/**
 * HCI2 A1
 * Gershon Reydman
 * Eric Kulchycki
 * Anton Sawka
 */

 
//var h1 = document.getElementsByTagName('h1')[0];
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    //h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1);
}

function stopTimer() {
    //alert(h1.textContent);
    var _time = seconds;
    clearTimer();
    return _time;
}

function clearTimer() {
	clearTimeout(t);
	//h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}

$(document).ready(function() {
	//h1 = document.getElementsByTagName('h1')[0];
    //timer();
});