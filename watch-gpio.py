import RPi.GPIO as GPIO
import socket

# s = socket.create_connection("localhost", )

GPIO.setmode(GPIO.BOARD)

GPIO.setup(7, GPIO.IN)

GPIO.add_event_detect(7, GPIO.BOTH, bouncetime=1000)

while True:
  if GPIO.event_detected(7):
    print(GPIO.input(7))
    if GPIO.input(7):
      print("event detected")
