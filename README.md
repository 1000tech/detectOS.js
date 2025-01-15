# DetectOS.js
Simple definition of popular operating systems and browsers in JavaScript without dependencies.

## Install

### NPM:
```smartyconfig
npm i detectos.js
```

### Yarn:
```smartyconfig
yarn add detectos.js
```

### Bower:
```smartyconfig
bower i detectos.js
```

## Usage
```smartyconfig
import DetectOS from 'detectos.js'
const Detect = new DetectOS()

console.log("We know your browser – it's " + Detect.browser + " " + Detect.version);
console.log("We know your OS – it's " + Detect.OS);
console.log("We know everything about you.");
```

## Demo
Used on [MobiDevices](https://mobidevices.com)
