const Detect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser)
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion)
        this.OS = this.searchString(this.dataOS)
    },
    searchString: function (data) {
        for (let i = 0; i < data.length; i++) {
            let dataString = data[i].string
            let dataProp = data[i].prop
            this.versionSearchString = data[i].versionSearch || data[i].identity
            if (dataString) {
                if (dataString.indexOf(data[i].subString) !== -1) return data[i].identity
            }
            else if (dataProp) return data[i].identity
        }
    },
    searchVersion: function (dataString) {
        let index = dataString.indexOf(this.versionSearchString)
        if (index === -1) return
        return parseFloat(dataString.substring(index+this.versionSearchString.length + 1))
    },
    dataBrowser: [
        /***************
         * Chrome
         ***************/
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        /***************
         * Safari
         ***************/
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },
        /***************
         * For Older Opera (12.18-)
         ***************/
        {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
        },
        /***************
         * Internet Explorer 10
         ***************/
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "IE10",
            versionSearch: "MSIE"
        },
        /***************
         * Internet Explorer 11
         ***************/
        {
            string: navigator.userAgent,
            subString: "Trident",
            identity: "IE11",
            versionSearch: "rv"
        },
        /***************
         * Edge
         ***************/
        {
            string: navigator.userAgent,
            subString: "Edge",
            identity: "Edge",
            versionSearch: "Edge"
        },
        /***************
         * Firefox
         ***************/
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        /***************
         * For Older Netscapes (4-)
         ***************/
        {
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        },
        /***************
         * For Newer Netscapes (6+)
         ***************/
        {
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        /***************
         * Other Browsers
         ***************/
        {
            string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        }
    ],
    dataOS: [
        {
            string: navigator.platform,
            subString: 'Win',
            identity: 'Windows'
        },
        {
            string: navigator.platform,
            subString: 'Mac',
            identity: 'macOS'
        },
        {
            string: navigator.userAgent,
            subString: 'iPhone',
            identity: 'iOS'
        },
        {
            string: navigator.userAgent,
            subString: 'iPad',
            identity: 'iOS'
        },
        {
            string: navigator.userAgent,
            subString: 'iPod',
            identity: 'iOS'
        },
        {
            string: navigator.userAgent,
            subString: 'Android',
            identity: 'Android'
        },
        {
            string: navigator.platform,
            subString: 'Linux',
            identity: 'Linux'
        }
    ]
}

Detect.init()