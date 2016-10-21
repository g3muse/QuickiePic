/**
 * Created by g3muse on 8/9/16.
 */

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var flag = false;

var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;
var dot_flag = false;


var x = document.getElementById('colorPicker').value;
var y = 10;
var tempY = 10;
var erased = 0;
var colorSaveMode = 0;

function init(){
    c = document.getElementById('myCanvas');
    ctx = c.getContext("2d");

    c.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    c.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    c.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    c.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function color(obj) {
}

function findxy(res, e) {

    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - c.offsetLeft;
        currY = e.clientY - c.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = "#BAD343";
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - c.offsetLeft;
            currY = e.clientY - c.offsetTop;
            draw();
        }
    }
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle =  x ;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function selectColor(){
    erased = 0;
    x = document.getElementById("colorPicker").value;
    y = document.getElementById("brushWidth").value;
}

function erase(){
    x = document.getElementById("eraser").value;
    tempY = y;
    y = 50;
    erased = 1;
}

function brushWidth(){
    y = document.getElementById("brushWidth").value;
}


function addToPallette(buttonNum){
    var g = document.getElementById(buttonNum);
    if(colorSaveMode == 1) {
        g.style.color = x;
        g.style.backgroundColor = x;
    }else{
        x = g.style.color;
        b = document.getElementById('colorPicker');
        b.value = g.style.color;
    }
}

function colorSave(){
    var c = document.getElementById('colorSave');
    if(colorSaveMode == 1) {
        c.style.backgroundColor = "#FFFFFF";
        c.style.color="#000000";
        colorSaveMode = 0;
    }else{
        c.style.backgroundColor = "#000000";
        c.style.color="#FFFFFF";
        colorSaveMode = 1;
    }

}
