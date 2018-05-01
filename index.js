var motorHat = require('motor-hat')({
    address: 0x60,
    dcs: ['M1', 'M2', 'M3', 'M4'],
    servos: [0,14]
});

motorHat.init();


var joystick = new (require('joystick'))(0, 3500/2, 350);

joystick.on('axis', function(event) {
    // Typical Event: { time: 22283520, value: 32636, number: 3, type: 'axis', id: 0 }
    var value = event.value / 32768; // Normalize to the range -1.0 - 0 - 1.0
    if (event.number === 3) { // 3 is left/right on the right pad
        if (Math.abs(value) < 0.1) value = 0;
        motorHat.dcs[0].run(value >= 0 ? 'fwd' : 'back', function() {});
        motorHat.dcs[0].setSpeed(100 * Math.abs(value), function() {});
    }
});
