import {execSync} from 'child_process'
import open from 'open'

/**
 * Returns true if it opened a browser, otherwise false.
 */
function openBrowser(url: string): boolean {
    // If we're on OS X, the user hasn't specifically
    // requested a different browser, we can try opening
    // Chrome with AppleScript. This lets us reuse an
    // existing tab when possible instead of creating a new one.
    const shouldTryOpenChromiumWithAppleScript = process.platform === 'darwin'

    if (shouldTryOpenChromiumWithAppleScript) {
        // Will use the first open browser found from list
        const supportedChromiumBrowsers = [
            'Google Chrome Canary',
            'Google Chrome Dev',
            'Google Chrome Beta',
            'Google Chrome',
            'Microsoft Edge',
            'Brave Browser',
            'Vivaldi',
            'Chromium',
        ]

        for (const chromiumBrowser of supportedChromiumBrowsers) {
            try {
                // Try our best to reuse existing tab
                // on OSX Chromium-based browser with AppleScript
                execSync('ps cax | grep "' + chromiumBrowser + '"')
                execSync(
                    'osascript openChrome.applescript "' +
                    encodeURI(url) +
                    '" "' +
                    chromiumBrowser +
                    '"',
                    {
                        cwd: __dirname,
                        stdio: 'ignore',
                    }
                )
                return true
            } catch (err) {
                // Ignore errors.
            }
        }
    }

    // Fallback to open
    // (It will always open new tab)
    try {
        var options = {wait: false, url: true}
        open(url, options).catch(() => { }) // Prevent `unhandledRejection` error.
        return true
    } catch (err) {
        return false
    }
}

export default openBrowser
 