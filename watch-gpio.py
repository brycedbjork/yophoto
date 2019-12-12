import RPi.GPIO as GPIO
import socket
from time import sleep

# s = socket.create_connection("localhost", )

activated = 0
slept = 0

GPIO.setmode(GPIO.BOARD)

GPIO.setup(7, GPIO.IN)

# GPIO.add_event_detect(7, GPIO.BOTH, bouncetime=1000)

while True:

  if GPIO.input(7) == GPIO.LOW:
    print("not activated")
  elif GPIO.input(7) == GPIO.HIGH:
    print("activated")

  sleep(.1)
