const updateInterval = 20;
const cursorColor = "red";
const cursorSize = 15;
const cursorShape = "circle";
const debugLine = document.querySelector("#debug");
let midcanvas = document.querySelector("#trackArea");
let trackCursor

switch(cursorShape) {
	case "circle":
		trackCursor = new circularcomponent(cursorSize);
		break;
	case "square":
		trackCursor = new component(cursorSize, cursorSize, cursorColor, 10, 120);
		break;
}
let theArea = {
    x : 0, y : 0,
    canvas : midcanvas,
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateCanvasArea, updateInterval);
        midcanvas.addEventListener('pointermove', function (e) {
          debugLine.innerHTML = " " + (e.pageX - midcanvas.offsetLeft) + " : " + (e.pageY - midcanvas.offsetTop);
          theArea.x = (e.pageX - midcanvas.offsetLeft);
          theArea.y = (e.pageY - midcanvas.offsetTop);
        })
    }, 
    clear : function(){
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;  
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = theArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
function circularcomponent(radius) {
  this.x = (midcanvas.width / 2);
  this.y = (midcanvas.height / 2);
  this.radius = radius;
  this.color = cursorColor;
  this.update = function() {
    ctx = theArea.context;
//     Oddly, this beginPath is required or the original circles will persist even after the canvas clears...
    ctx.beginPath();
    ctx.globalAlpha = 0.7
    ctx.fillStyle = this.color;
    ctx.arc(theArea.x, theArea.y, this.radius, 0, 2*Math.PI);
    ctx.fill();
  }
}
function updateCanvasArea() {
  theArea.clear();
  if (theArea.x && theArea.y) {
    trackCursor.x = theArea.x - (trackCursor.width / 2);
    trackCursor.y = theArea.y - (trackCursor.height / 2);
  }
    trackCursor.update();
}
window.onload = function() {
  theArea.start()
}