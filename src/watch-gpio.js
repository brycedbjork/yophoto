var Gpio = require("onoff").Gpio;

const button = new Gpio(7, "in");
console.log(button);
button.watch(value => console.log(value));
