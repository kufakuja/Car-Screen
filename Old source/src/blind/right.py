#!/usr/bin/env python
import RPi.GPIO as GPIO
import time

Pin1   = 11
Pin2   = 12
EnablePin = 13

def setup():
	GPIO.setmode(GPIO.BOARD)          # Numbers GPIOs by physical location
	GPIO.setup(Pin1, GPIO.OUT)   # set modes to output
	GPIO.setup(Pin2, GPIO.OUT)
	GPIO.setup(EnablePin, GPIO.OUT)
	GPIO.output(EnablePin, GPIO.LOW) # stop

def action():
	GPIO.output(Pin1, GPIO.HIGH)  # anticlockwise
	GPIO.output(Pin2, GPIO.LOW)
	GPIO.output(EnablePin, GPIO.HIGH) # motor driver enable
	time.sleep(1.5)
		
	GPIO.output(EnablePin, GPIO.LOW) # motor stop
	time.sleep(1)

def destroy():
	GPIO.output(EnablePin, GPIO.LOW) # motor stop
	GPIO.cleanup()                     # Release resource

if __name__ == '__main__':     # Program start from here
	setup()
	try:
		action()
		destroy()

	except KeyboardInterrupt:  # When 'Ctrl+C' is pressed, the child program destroy() will be  executed.
		destroy()
