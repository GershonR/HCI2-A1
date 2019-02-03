/**
 * HCI2 A1
 * Gershon Reydman
 * Eric Kulchycki
 * Anton Sawka
 */

var seconds = 0;
var minutes = 0;
var hours = 0;
var t;

var timeLog = [];
var timeLogLength = 0;

var timeResult = "0";

function add() {
    seconds++;
    if (seconds >= 1000) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    timer();
}

function timer() {
    t = setTimeout(add, 1);
}

function stopTimer() {
    var _time;

    /* TODO fix this shit eric

    timeLog.push(timeResult);
	console.log(timeResult);
    timeLogLength++;
    var outputTimeString = "";
    if(timeLogLength == 90  ) {
        for(var x = 0; x < timeLogLength; x++) {
            outputTimeString += timeLog[x] + "\n";
        }
        console.log(outputTimeString);
    }*/
    _time = hours + ":" + minutes + ":" + seconds;
    clearTimer();
    return _time;
}

function clearTimer() {
	clearTimeout(t);
	timeResult = "0";
    seconds = 0; minutes = 0; hours = 0;
}

$(document).ready(function() {} );