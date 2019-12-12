import onoff from "onoff";

const Gpio = onoff.Gpio;

const button = new Gpio(7, "in");
console.log(button);
button.watch((value: any) => console.log(value));
