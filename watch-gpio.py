import RPi.GPIO as GPIO
import socket
from time import sleep

# s = socket.create_connection("localhost", )

activated = 0

GPIO.setmode(GPIO.BOARD)

GPIO.setup(7, GPIO.IN)

while True:

  print(GPIO.input(7))

  if GPIO.input(7) and not activated:
    activated = 1
    print("activated")
  elif activated:
    activated = 0
    print("not activated")

  sleep(1)
