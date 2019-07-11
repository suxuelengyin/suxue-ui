(function () {
    var css = `
        .su-messageInfo {
            position: fixed;
            top: 40%;
            left: 50%;
            left:25%;
            right:25%;
            margin:auto;
            border-radius: 4px;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 14px 24px;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;          
        }

        @keyframes messageIn {
            0% {
                transform: scale(0);
            }

            100% {
                transform: scale(1);
            }
        }

        @keyframes messageOut {
            0% {
                transform: scale(1) ;
            }

            100% {
                transform: scale(0) ;
            }
        }
        `
    cssSheet(css)
    var timeNeed
    function cssSheet(text) {
        var head = document.getElementsByTagName('head')[0]
        var style = document.createElement('style');
        style.innerHTML = text
        head.appendChild(style)
    }
    function messageIntoDOM(options) {
        var { type, describe: { text, title }, delay } = options
        var body = document.getElementsByTagName('body')[0]
        var div = document.createElement('div')
        var messageDiv = document.querySelector(".su-messageInfo");
        if (messageDiv) {
            setTimeout(function () {
                messageIntoDOM(options)
            }, timeNeed)
            return
        }

        var html = `
        <div class="su-messageInfo" style="animation: messageIn .3s">
            <span style="font-size: 13px;color: #ffffff">${title}</span>
            <span style="font-size: 13px;color: #ffffff;margin: 7px 0;">${text}</span>
        </div>
        `
        div.innerHTML = html
        body.appendChild(div)
        timeNeed = delay + 300 * 2
        setTimeout(function () {
            document.querySelector(".su-messageInfo").style.transform = "scale(0)"
            document.querySelector(".su-messageInfo").style.animation = "messageOut .3s"
            setTimeout(function () {
                body.removeChild(div)
            }, 200)
        }, delay || 1000)
    }
    window.message = {
        info: function (options) {
            messageIntoDOM({ type: 'info', ...options })
        }
    }
})()