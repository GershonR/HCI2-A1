/**
 * HCI2 A1
 * Gershon Reydman
 * Eric Kulchycki
 * Anton Sawka
 */

 
var h1 = document.getElementsByTagName('h1')[0];
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;

var timeLog = [];
var timeLogLength = 0;

var timeResult = "0";

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
    timeResult = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1);
}

function stopTimer() {
    timeLog.push(timeResult);
	console.log(timeResult);
    timeLogLength++;
    var outputTimeString = "";
    if(timeLogLength == 90) {
        for(var x = 0; x < timeLogLength; x++) {
            outputTimeString += timeLog[x] + "\n";
        }
        console.log(outputTimeString);
    }
    clearTimer();
}

function clearTimer() {
	clearTimeout(t);
	timeResult = "0";
    seconds = 0; minutes = 0; hours = 0;
}

$(document).ready(function() {
	h1 = document.getElementsByTagName('h1')[0];
    //timer();
});