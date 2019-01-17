import subprocess
import time
import shlex

greeting = 'You should be in bed!'
hour = int(time.strftime("%H"))
if ( hour > 4 ):
    greeting = 'Good morning.'
if ( hour > 12 ):
    greeting = 'Good afternoon.'
if (hour > 19):
    greeting = 'Good evening.'
    
text = greeting + ' It is ' + time.strftime("%A, %d %B %Y") + '. The time is ' + time.strftime("%I %M %p")
subprocess.call(['./src/readouts/speech.sh', text]) 