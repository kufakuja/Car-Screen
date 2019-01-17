import subprocess
import time
import shlex

text = 'Good morning. It is ' + time.strftime("%A, %d %B %Y") + '. The time is ' + time.strftime("%I %M %p")

subprocess.call(shlex.split('./speech.sh "' + text + '"')) 
