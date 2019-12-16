# yophoto

## motivation

Today, we live fragmented lives. We divide ourselves between the physical world and our digital devices. We may believe our digital lives to be true to the real world, but they are actually quite different. Yophoto is an exploration of this difference, seeking to isolate the discrepancy between the photographed self (how we look when we’re posing) and the true self (what we look like when we think nobody’s capturing). Yophoto is an interactive photo booth experience with a twist. It may seem like a simple camera, but it carries a crucial element of surprise. Instead of showing what you expect to have been captured, it gives you the previous participant’s experience with the device, showing you how they looked when they thought they were being photographed, and how they looked after their photo wasn’t shown.

## materials

- Raspberry Pi
- Two-state switch
- Two male alligator wires
- ESP32
- 2 Micro USB cables
- USB Camera with built-in cable
- HDMI cable
- Raspberry Pi 9" Display
- Power cable for Raspberry Pi Display
- Laser-cuttable Acrylic
- 3M tape

## build process

- Laser cut a piece of acrylic according to the Coral Draw document in this repo
- Construct the enclosure using 3M tape as joints between the pieces.
- Soder the male alligator wires to the two-state switch, one to the middle connection and one to a side connection
- Flash the ESP32 with the esp.ino code in this repo using the Arduino IDE
- Install program on the Raspberry Pi by following the instructions bellow
- Connect the Pi to the Pi Display by HDMI and Micro USB
- Connect the USB camera to the Pi
- Connect the ESP32 to the Pi by MicroUSB

## getting started on Raspberry Pi

- clone repo into home directory `git clone https://github.com/brycedbjork/yophoto`
- install packages `npm install -arch=armv7l`
- open autostart script `nano /home/pi/.config/lxsession/LXDE/autostart`
- add line `npm start --prefix=/home/pi/yophoto`
- reboot

## experience

Conceptualizing, designing, building, and exhibiting yophoto was an exciting, stressful, and educational experience. Part of the difficulty of this project was honing in on a project with the right scope – something doable but with stretch goals, that delivers a meaningful experience with a low floor and high ceiling. I was initially debating whether I should create a full-fledged programmable xylophone, building from my motor project where I programmed a single key. Upon further reflection, the solenoids necessary to create this would be quite expensive, and tuning that system would be difficult, potentially leading to a high floor. I decided instead to pursue something related to how we live digital and physical lives that are separated. While we may think that our digital lives reflect the real world, the medium (Instagram, Facebook, texts) inherently changes the content, thus skewing our digital lives away from reality and towards something more contrived. Having found an artistic vision for this project, I began drawing out the user experience of interacting with yophoto. I wanted people to think they had control over the photo-taking process, but be made aware that cameras are easily programmed to violate our assumptions. In doing so, I hoped to highlight the opacity of technology's relationship to the everyday person, and the loss of privacy from IoT devices.

## challenges

In this project, I ran into almost every challenge imaginable, and some that I couldn't have imagined. One challenge was designing and fabricating an enclosure that could house all of the appropriate components while also enhancing the artistic vision. I decided on something transparent, so that you would be able to peek into the electronics behind the photo booth. Importantly, participants do not actually understand the wiring and how the device functions – the "transparency" is just an illusion, as you have no real control over when or how you are being captured. After laser-cutting the acrylic, I was faced with the task of connecting everything into a cohesive enclosure. I initially thought that Acrylic glue would work well, but Acrylic glue is far too permanent, so I eventually settled on some strong tape that would allow me to easily open and reseal the enclosure.

Another challenge I faced was designing the program to run according to the timing I envisioned. I built the program using Electron and React, and timing up the actions proved more difficult than I anticipated. Additionally, I struggled with the best way to store photos. As an Electron app, I did not have access to the local file system, so I was not able to simply "save" an image. Instead, I had to keep the image in the app's RAM. This introduced another constraint – the amount of RAM on the device. If I stored all the images, the program would eventually run out of RAM. To address this constraint, I implemented a limited photo storage pattern where every other image captured is replacing an uneccessary image, storing all files as base64 strings in React state.

Getting an Electron app to build on the Raspberry Pi was an unanticipated challenge. I imagined that it would be quite easy, but I had to do a number of things to make it actually work. My Raspberry Pi had an outdated version of Node which was causing a bunch of problems, so I had to first update that. I also was not aware that some of the node modules need to be built differently depending on the target machine's architecture (see the -arch flag in the install script above). After finally getting the Electron app to build on the Raspberry Pi, I thought that I was on the home stretch, but I couldn't have been more wrong...

Definitely the biggest challenge faced in this final project (and really in any project I've worked on this semester for Creative Embedded Systems), was trying to connect the switch to the Electron app. I initially thought that I would be able to use the rpi-gpio node module, but then realized that I had made a grave mistake: Electron apps essentially mirror a browser,so you can't access any of the native functionality for security reasons. Connecting the switch proved to be an enormous endeavor. I then tried implementing a socket that would watch a certain localhost port, but electron apps don't have sufficient permissions for this. Next I tried piping the switch data through an ESP and into the Pi over serial, which seemed initially viable because of the serialport node module. It seems that you can use serialport with Electron, as there is a boilerplate app, but it is quite fragile because all of the dependencies need to be compliled natively and my app had incompatibilities that made this impossible. Ultimately, the only option to accomplish what I set out to do with an Electron app would have been to create a remote server where the switch posts it's value, and to have the Electron app watch this server, initiating photos when the server says so. By the time I realized this was the only way forward, the final demo was right around the corner and this solution wasn't feasible. The only way forward was to revise my app; instead of taking GPIO input and starting the camera sequence on a switch, I put the run script on a 30s timer. I decided to still install the switch hardware and incorporate it into my artistic vision as a reminder that you think you have control, but you really don't.

## takeaways

Overall, I think that yophoto was very successful. Many passerbys interacted with the piece, and were surprised when they saw a photo of the previous participant instead of themselves. It definitely created the impression that you can't quite trust the technology, which was a major part of the motiviation behind this piece. I anticipated the difference between the first and second photo (the difference between the being-captured and post-surprise photo) to be more significant, but on the low-res USB camera and in the low-lighting exhibition environment, this difference was slightly muted. Nevertheless, yophoto was very successful, and I think it is a strong reflection of Creative Embedded Systems.

## video

https://youtu.be/T3ULQAhdn2U
