//var riot = require('riot');
//var riotControl = require('riot-control');

console.log('main.js ...');

function btn_change_header_click_handler() {
    var hdr = this.document.getElementById('my-header');
    if (hdr == null) {
        console.log("ERROR - NO my-header on this page.");
        return;
    }
    hdr.innerHTML = "Changed My Header6";
    hdr.style.color = "red";//#FF0000";//red
}
 
var WIDTH = 500;
var HEIGHT = 500;

function add_waveform_view(name, z) {
    console.log("creating waveform name = " + name + " z-order=" + z);
    var stack = document.getElementById("waveform-stack");
    if (stack == null) {
        console.log("ERROR - NO waveform-stack on this page.");
        return;
    }
    // WIDTH = get the width of the stack
    // HEIGHT = get the height of the stack
    var canvas = document.createElement('canvas');
    if (canvas == null) {
        console.log("ERROR - NO Canvas for " + name);
        return;
    }

    canvas.id = name;
    stack.appendChild(canvas);

    canvas.style["opacity"] = "0.2";
    canvas.style["position"] = "absolute";
    canvas.style["left"] = "10px";
    canvas.style["top"] = "0px;";
    canvas.style["zindex"] = z;// where z=1,2,3,4, etc.
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // draw waveform data ....
    var ctx = canvas.getContext('2d');
    var x = 250;
    var y = 250;
    var radius = 200;
    console.log("WIDTH=" + WIDTH + " HEIGHT=" + HEIGHT);
    console.log("canvas.width=" + canvas.width + " canvas.height=" + canvas.height);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#DDDDDD"; 
    ctx.beginPath();
    ctx.rect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, ((Math.PI/2)*z), true);
    ctx.closePath();
    ctx.fill();

    // add a text label
    ctx.fillStyle = "#FF0000";
    var tx = 10 + (14 * z);
    var ty = 10 + (14 * z);
    ctx.font = "bold 18px Arial";
    ctx.fillText(name, tx, ty); // text and position
}

 
function init() {
    this.add_waveform_view("wv1", 1);
    this.add_waveform_view("wv2", 2);
    this.add_waveform_view("wv3", 3);
    this.add_waveform_view("wv4", 4);
    this.add_waveform_view("wv5", 5);
}
 