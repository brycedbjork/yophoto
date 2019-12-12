import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)

GPIO.setup(7, GPIO.IN)

def my_callback():
  print("press")

while True:
  GPIO.add_event_callback(7, my_callback, bouncetime=200)
