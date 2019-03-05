#!/usr/bin/env node

const argv = require('yargs').argv;

function format(totalMs) {
  const ms = Math.floor((totalMs % 1e3) / 10); // Drop the last number
  const seconds = Math.floor(totalMs / 1e3) % 60;
  const minutes = Math.floor(totalMs / 60e3) % 60;
  const hours = Math.floor(totalMs / 3600e3);

  const stringify = (num) => {
    return String(num).padStart(2, '0');
  }

  return (hours ? `${stringify(hours)}:` : '')
    + `${stringify(minutes)}:`
    + `${stringify(seconds)}.`
    + `${stringify(ms)}`;
}

function print(text) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(text);
}

if (require.main === module) {
  const startTime = Date.now();
  const interval = argv.interval || 66; // Default refresh rate 66ms ~ 15 FPS
  
  const formatNow = () => {
    return format(Date.now() - startTime);
  }

  // Refresh console time each interval 
  const tick = setInterval(() => {
    print(formatNow());
  }, interval);
  print(formatNow());

  // Capture SIGINT to remove CTRL^C, and exit gracefully by clearing the timer
  process.on('SIGINT', () => {
    clearInterval(tick);  
    print(`${formatNow()}\n`);
  });
}

module.exports = {
  format,
}
