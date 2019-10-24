const fs = require('fs');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/bin/file");
    process.exit(-1);
}
var path = process.argv[2];

var buffer = Buffer.from(fs.readFileSync(`${path}`, 'binary'),'binary');
var length = buffer.length;
var new_buffer = buffer;
if (length == 540)
{
    new_buffer = new_buffer.slice(0, length-8);
    console.log("Fixed Length");
}
if (new_buffer[0xA] == 0x00 && new_buffer[0xB] == 0x00)
{
    new_buffer[0xA] = 0x0F;
    new_buffer[0xB] = 0xE0;
    console.log("Fixed first constant");
}
if (new_buffer[0x208] == 0x00 && new_buffer[0x20A] == 0x00)
{
    new_buffer[0x208] = 0x01;
    new_buffer[0x20A] = 0x0F;
    console.log("Fixed Second constant");
}
var fstream = fs.createWriteStream(`${path}`.split('.bin')[0] + ".fixed.bin");

fstream.write(new_buffer);

console.log("done, saved file at " + `${path}`.split('.bin')[0] + ".fixed.bin");