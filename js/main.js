let url = "./browsers.json";
var canvas = document.getElementById("myCanvas");
var canvas2 = document.getElementById("myCanvas2");
var context = canvas.getContext("2d");
let data = [];
var labels = [];
var colors = [];
var total = 0;
//***************PieChart***************
function drawSlice(canvas, context, i) {
    context.save();
    var centerX = Math.floor(canvas.width / 2);
    var centerY = Math.floor(canvas.height / 2);
    radius = Math.floor(canvas.width / 2);
    var startAngle = toRads(getSum(data, i));
    var arcSize = toRads(data[i]);
    var endAngle = startAngle + arcSize;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, startAngle, endAngle, false);
    context.closePath();
    context.fillStyle = colors[i];
    context.fill();
    context.restore();
    addLabel(canvas, context, i);
}

function toRads(degrees) {
    return ((degrees * Math.PI) / 180) * 360 / total;
}

function getSum(a, i) {
    var sum = 0;
    for (var j = 0; j < i; j++) {
        sum += a[j];
    }
    return sum;
}

function addLabel(canvas, context, i) {
    context.save();
    var x = Math.floor(canvas.width / 2);
    var y = Math.floor(canvas.height / 2);
    var angle = toRads(getSum(data, i));
    context.translate(x, y);
    context.rotate(angle);
    var drawX = Math.floor(canvas.width * 0.5) - 10;
    var drawY = Math.floor(canvas.height * 0.05);
    context.textAlign = "right";
    var fontSize = Math.floor(canvas.height / 25);
    context.font = fontSize + "pt Helvetica";
    context.fillText(labels[i], drawX, drawY);
    context.restore();
}
//***************PieChart***************
//***************OtherChart***************
//***************OtherChart ***************
//***************Get Data***************
fetch(url).then(function (response) {
    return response.json();
}).then(function (makeUseable) {
    console.log(makeUseable);
    for (let counter = 0; counter < makeUseable.segments.length; counter++) {
        data.push(makeUseable.segments[counter].value);
        total += makeUseable.segments[counter].value;
    }
    for (let counter = 0; counter < makeUseable.segments.length; counter++) {
        labels.push(makeUseable.segments[counter].label);
    }
    for (let counter = 0; counter < makeUseable.segments.length; counter++) {
        colors.push(makeUseable.segments[counter].color);
    }
    console.log("this is the total: " + total);
    for (var i = 0; i < data.length; i++) {
        drawSlice(canvas, context, i);
    }
    console.log(data);
    console.log(labels);
    console.log(colors);
});
//***************Get Data***************