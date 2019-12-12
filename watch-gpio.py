import RPi.GPIO as GPIO
import socket
from time import sleep

# s = socket.create_connection("localhost", )

activated = 0

GPIO.setmode(GPIO.BOARD)

GPIO.setup(7, GPIO.IN)

GPIO.add_event_detect(7, GPIO.BOTH, bouncetime=1000)

while True:

  if GPIO.event_detected(7) and not activated:
    activated = 1
    print("activated")
  elif activated:
    activated = 0
    print("not activated")
