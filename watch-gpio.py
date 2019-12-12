import RPi.GPIO as GPIO
import socket
from time import sleep

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

server_address = ('localhost', 10000)
print('Connecting to {} port {}'.format(*server_address))
sock.connect(server_address)

activated = 0

GPIO.setmode(GPIO.BOARD)

GPIO.setup(7, GPIO.IN)

GPIO.add_event_detect(7, GPIO.BOTH, bouncetime=2000)

while True:

  if GPIO.event_detected(7):
    sock.send(1)
