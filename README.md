# DetectOS.js
Frontend-only browser detection for popular operating systems and browsers in JavaScript without dependencies.

This package is intended for browser runtimes only. It relies on browser APIs such as navigator and should not be used in SSR or backend Node.js code.

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

If you instantiate the class outside a browser, it throws an explicit browser-only error. For tests, you can pass a browser-like environment object:

```smartyconfig
const Detect = new DetectOS({
	navigator: {
		userAgent: 'Mozilla/5.0 ... Chrome/122.0.0.0 Safari/537.36',
		appVersion: '5.0',
		vendor: 'Google Inc.',
		platform: 'MacIntel'
	},
	window: {}
})
```

## Notes
- The library is browser-only and intended for frontend apps.
- Detection is based on user-agent sniffing, so results depend on what the browser exposes.
- Modern Edge, Chrome, Firefox, Safari, Opera, Android, iOS, macOS, Windows and Linux are covered.

## Demo
Used on [MobiDevices](https://mobidevices.com)
