const BROWSER_ONLY_ERROR = 'DetectOS.js is a browser-only library for frontend runtimes. Use it in the browser or pass a browser-like environment for tests.'

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function resolveEnvironment(environment) {
    if (environment) {
        if (!environment.navigator) {
            throw new Error(BROWSER_ONLY_ERROR)
        }

        return environment
    }

    if (typeof globalThis !== 'undefined' && globalThis.navigator) {
        return globalThis
    }

    throw new Error(BROWSER_ONLY_ERROR)
}

export default class DetectOS {
    constructor(environment) {
        const browserEnvironment = resolveEnvironment(environment)
        const browserMatch = this.searchString(this.dataBrowser(browserEnvironment), browserEnvironment)
        const osMatch = this.searchString(this.dataOS(browserEnvironment), browserEnvironment)
        const versionSearchString = browserMatch && (browserMatch.versionSearch || browserMatch.identity)
        const navigatorObject = browserEnvironment.navigator || {}

        this.browser = browserMatch ? browserMatch.identity : null
        this.version = versionSearchString
            ? this.searchVersion(navigatorObject.userAgent, versionSearchString) || this.searchVersion(navigatorObject.appVersion, versionSearchString)
            : null
        this.OS = osMatch ? osMatch.identity : null
        this.os = this.OS
    }

    searchString(data, environment) {
        for (let i = 0; i < data.length; i++) {
            const item = data[i]
            const dataString = item.string
            const dataProp = item.prop

            if (typeof item.test === 'function' && item.test(environment)) {
                return item
            }

            if (typeof dataString === 'string' && dataString.indexOf(item.subString) !== -1) {
                return item
            }

            if (dataProp) {
                return item
            }
        }

        return null
    }

    searchVersion(dataString, versionSearchString) {
        if (!dataString || !versionSearchString) {
            return null
        }

        const versionPattern = new RegExp(`${escapeRegExp(versionSearchString)}[\\/: ]?([0-9.]+)`)
        const match = dataString.match(versionPattern)

        if (!match) {
            return null
        }

        const version = parseFloat(match[1])
        return Number.isNaN(version) ? null : version
    }

    dataBrowser(environment) {
        const navigatorObject = environment.navigator || {}
        const windowObject = environment.window || environment

        return [
            {
                string: navigatorObject.userAgent,
                subString: 'EdgiOS/',
                identity: 'Edge',
                versionSearch: 'EdgiOS'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'EdgA/',
                identity: 'Edge',
                versionSearch: 'EdgA'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'Edge/',
                identity: 'Edge',
                versionSearch: 'Edge'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'Edg/',
                identity: 'Edge',
                versionSearch: 'Edg'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'OPR/',
                identity: 'Opera',
                versionSearch: 'OPR'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'CriOS/',
                identity: 'Chrome',
                versionSearch: 'CriOS'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'Chrome/',
                identity: 'Chrome',
                versionSearch: 'Chrome'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'FxiOS/',
                identity: 'Firefox',
                versionSearch: 'FxiOS'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'Firefox/',
                identity: 'Firefox',
                versionSearch: 'Firefox'
            },
            {
                string: navigatorObject.vendor,
                subString: 'Apple',
                identity: 'Safari',
                versionSearch: 'Version'
            },
            {
                prop: windowObject.opera,
                identity: 'Opera',
                versionSearch: 'Version'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'MSIE ',
                identity: 'IE10',
                versionSearch: 'MSIE'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'Trident/',
                identity: 'IE11',
                versionSearch: 'rv'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'Gecko/',
                identity: 'Mozilla',
                versionSearch: 'rv'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'Mozilla/',
                identity: 'Netscape',
                versionSearch: 'Mozilla'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'Netscape',
                identity: 'Netscape'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'OmniWeb/',
                versionSearch: 'OmniWeb/',
                identity: 'OmniWeb'
            },
            {
                string: navigatorObject.vendor,
                subString: 'iCab',
                identity: 'iCab'
            },
            {
                string: navigatorObject.vendor,
                subString: 'KDE',
                identity: 'Konqueror'
            },
            {
                string: navigatorObject.vendor,
                subString: 'Camino',
                identity: 'Camino'
            }
        ]
    }

    dataOS(environment) {
        const navigatorObject = environment.navigator || {}

        return [
            {
                test: ({ navigator }) => navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1,
                identity: 'iOS'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'iPhone',
                identity: 'iOS'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'iPad',
                identity: 'iOS'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'iPod',
                identity: 'iOS'
            },
            {
                string: navigatorObject.userAgent,
                subString: 'Android',
                identity: 'Android'
            },
            {
                string: navigatorObject.platform,
                subString: 'Win',
                identity: 'Windows'
            },
            {
                string: navigatorObject.platform,
                subString: 'Mac',
                identity: 'macOS'
            },
            {
                string: navigatorObject.platform,
                subString: 'Linux',
                identity: 'Linux'
            }
        ]
    }
}
