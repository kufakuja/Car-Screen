#Code sourced from https://github.com/dmcg/raspberry-strogonanoff

channel_codes = [
    [0x33353335, 0x33533335, 0x35333335, 0x53333335],
    [0x33353353, 0x33533353, 0x35333353, 0x53333353],
    [0x33353533, 0x33533533, 0x35333533, 0x53333533],
    [0x33355333, 0x33535333, 0x35335333, 0x53335333]
]

on_code = 0x3333
off_code = 0x5333

default_pulse_width = 450 * 1e-6 # Measured from Maplin transmitters
