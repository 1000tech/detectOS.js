import test from 'node:test'
import assert from 'node:assert/strict'

import DetectOS from '../index.js'

test('throws a browser-only error when browser globals are unavailable', () => {
    assert.throws(() => new DetectOS({}), /browser-only library for frontend runtimes/i)
})

test('detects Edge on iOS with the correct version', () => {
    const detect = new DetectOS({
        navigator: {
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) EdgiOS/120.0.0 Mobile/15E148 Safari/605.1.15',
            appVersion: '5.0',
            vendor: 'Apple Computer, Inc.',
            platform: 'iPhone'
        },
        window: {}
    })

    assert.equal(detect.browser, 'Edge')
    assert.equal(detect.version, 120)
    assert.equal(detect.OS, 'iOS')
})

test('detects Chromium Edge on desktop without matching mobile tokens first', () => {
    const detect = new DetectOS({
        navigator: {
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
            appVersion: '5.0',
            vendor: 'Google Inc.',
            platform: 'MacIntel'
        },
        window: {}
    })

    assert.equal(detect.browser, 'Edge')
    assert.equal(detect.version, 122)
    assert.equal(detect.OS, 'macOS')
})

test('detects Safari on macOS', () => {
    const detect = new DetectOS({
        navigator: {
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
            appVersion: '5.0',
            vendor: 'Apple Computer, Inc.',
            platform: 'MacIntel'
        },
        window: {}
    })

    assert.equal(detect.browser, 'Safari')
    assert.equal(detect.version, 17.4)
    assert.equal(detect.OS, 'macOS')
})

test('detects iPadOS devices that report MacIntel', () => {
    const detect = new DetectOS({
        navigator: {
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
            appVersion: '5.0',
            vendor: 'Apple Computer, Inc.',
            platform: 'MacIntel',
            maxTouchPoints: 5
        },
        window: {}
    })

    assert.equal(detect.OS, 'iOS')
})