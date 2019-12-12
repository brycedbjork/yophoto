import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)

GPIO.setup(7, GPIO.IN)

GPIO.add_event_detect(7, GPIO.RISING, bouncetime=200) 

while True:
  if GPIO.event_detected(7):
    print("event detected")
