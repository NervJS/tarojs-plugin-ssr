import Document, { Html, Main } from 'next/document';
import { AresHead, AresScript } from 'tarojs-plugin-platform-nextjs/ares';
/*
Minify by terser:

```javascript
(function (window, document) {
    var documentElement = document.documentElement;

    function flex() {
        var width = documentElement.clientWidth;
        if (width >= 640) {
            documentElement.style.fontSize = '40px';
        }
        else {
            if (width <= 320) {
                documentElement.style.fontSize = '20px';
            }
            else {
                documentElement.style.fontSize = width / 320 * 20 + 'px';
            }
        }
    }

    window.addEventListener('resize', flex);
    window.addEventListener('DOMContentLoaded', flex);
})(window, document);
```
 */
const REM_SCRIPT = '!function(n,e){var t=e.documentElement;function d(){var n=t.clientWidth;t.style.fontSize=n>=640?"40px":n<=320?"20px":n/320*20+"px"}n.addEventListener("resize",d),n.addEventListener("DOMContentLoaded",d)}(window,document)';

const CONTAINER_STYLE = '#__next{max-width: 640px;margin: 0 auto;}';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <AresHead>
                    <style type='text/css' dangerouslySetInnerHTML={{__html: CONTAINER_STYLE}} />
                    <script dangerouslySetInnerHTML={{__html: REM_SCRIPT}} />
                </AresHead>
                <body>
                    <Main />
                    <AresScript />
                </body>
            </Html>
        );
    }
}
