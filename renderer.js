const { ReadlineParser, SerialPort } = require('serialport');

const parser = new ReadlineParser({
    delimiter: '\r\n'
});

var port = new SerialPort({
    path: "COM6",
    baudRate: 9600
});

port.pipe(parser);

parser.on('data', function (data) {
    processData(data);
});

function processData(data) {
    let i = 0;
    console.log(data);
    String(data).split("A").forEach(el => {
        i++;
        dist = parseFloat(el);
        if (dist > 100.0) {
            dist = 100.0;
        }
        let boxID = "us" + String(i);
        document.getElementById(boxID).style.backgroundColor = getColor(dist / 100.0);
        document.getElementById(boxID).innerText = ((dist == 100) ? "100+ cm" : String(dist) + " cm");
    });
}

function getColor(value) {
    //value from 0 to 1
    var hue = ((value) * 100).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }