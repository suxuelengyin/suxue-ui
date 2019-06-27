(function (global, factory) {

    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

    "use strict"

    function Comment(options) {
        var defaultOptions = {
            extendRule: {},
            shadeClick: false,
            submit: function (selectVal) {

            },

        }
        for (let key in defaultOptions) {
            this[key] = options[key] ? options[key] : defaultOptions[key]
        }
        this.rules = {
            like: {
                title: "感谢您的支持！",
                render: {
                    tag: ""
                },
                bottomTitle: "提交评价",
            },
            nolike: {
                title: "选择您不喜欢的理由（必选）",
                list: [...this.extendRule.nolike.list],
                bottomTitle: "提交评价"
            }
        }
        this.val = {}
        this.render(options)
        this.renderRule(this.rules)
        // 清空选择状态
        this.clear()
        if (this.shadeClick) {
            this.shade()
        }
        this.addEvent()
    }
    Comment.prototype = {
        get type() {

        },
        set type(val) {

        },
        clear: function () {
            // 不喜欢内容置灰
            var all = Array.from(document.querySelectorAll('.su-comment-list'))
            all.map(ele => {
                ele.className = 'su-comment-list'
            })
            // 评价置灰
            document.querySelector('#su-nolike .su-comment-bottom').className = "su-comment-bottom"
        },
        open: function (options) {
            var ruleType = options.type || "like"
            if (ruleType === 'nolike') {
                this.clear()
            }
            this.ruleType = ruleType
            if (!options.close) {
                document.getElementById('close').style.display = "none"
            } else {
                document.getElementById('close').style.display = "block"
            }
            document.querySelector("#su-" + ruleType).style.display = "block"
            this.pop.style.display = 'block'
        },
        close: function (cb) {
            document.querySelector("#su-" + this.ruleType).style.display = "none"
            this.pop.style.display = 'none'
        },
        shade: function () {
            var that = this
            document.getElementById('su-comment').addEventListener('click', function (e) {
                if (e.target.className === 'su-comment') {
                    that.close()
                }
            }, false)
        },
        addEvent: function () {
            document.querySelector('#close').addEventListener('click', (e) => {
                this.close();
            }, false)
        },
        cssSheet: function (text) {
            var head = document.getElementsByTagName('head')[0]
            var style = document.createElement('style');
            style.innerHTML = text
            head.appendChild(style)
        },
        updated(type) {
            const html =
                `

                `
            if (type === 'like') {

            }
        },
        // 渲染指定规则
        renderRule: function (rules) {
            var keys = Object.keys(rules)
            // 渲染html
            keys.map(key => {
                var div = document.createElement('div')
                div.id = "su-" + key
                div.style.display = "none"
                var rule = rules[key]
                var inner =
                    `
                    <div class='su-comment-content'>
                        ${rule.title ? `<span class='su-comment-title'>${rule.title}</span>` : ""}
                        ${rule.list ? rule.list.map((item, index) => `<div class='su-comment-list' data-index=${index} >${item}</div>`).join('') : ''}
                        ${key === "like" ? `<div class='su-comment-input'>
                            <textarea id="su-comment-textarea" placeholder="如果您有其他意见，可以在评论里告诉我们！"></textarea>
                        </div>`: ""}
                        ${rule.bottomTitle ? `<button class='su-comment-bottom ${key === "like" ? 'su-comment-bottom-active' : ""}'>${rule.bottomTitle}</button>` : ""}
                    <div>
                    `
                div.innerHTML = inner
                document.querySelector('.su-commentWrap').appendChild(div)
            })
            var all = Array.from(document.querySelectorAll('.su-comment-list'))
            var content = Array.from(document.querySelectorAll('.su-comment-content'))
            // 点击变色
            content.map(item => item.addEventListener('click', (e) => {
                console.log(e.target.className)
                // 点击每个评价变色
                if (e.target.className.indexOf('su-comment-list') > -1) {
                    // 激活提交按钮
                    document.querySelector('#su-nolike .su-comment-bottom').className = "su-comment-bottom su-comment-bottom-active"
                    var dataIndex = e.target.getAttribute('data-index');
                    // 保存选中的值
                    this.val[this.ruleType] = e.target.innerHTML
                    all.map(item => {
                        if (item.getAttribute('data-index') === dataIndex) {
                            item.className = "su-comment-list su-comment-list-active"
                            return
                        }
                        item.className = "su-comment-list"
                    })
                }
                // 提交，必须是激活状态的提交
                if (e.target.className === "su-comment-bottom su-comment-bottom-active") {
                    this.submit(this.ruleType, this.val[this.ruleType])
                }
            }, false))
            document.getElementById("su-comment-textarea").addEventListener('change', (e) => {
                this.val[this.ruleType] = e.target.value
            })

        },
        // 渲染必要元素
        render: function (options) {
            if (document.getElementById('su-comment')) {
                this.pop = document.getElementById('su-comment')
                return
            }
            var css =
                `
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        -webkit-tap-highlight-color: rgba(255,255,255,0);
                        -webkit-tap-highlight-color: transparent;
                    }
                    button, textarea{
                        outline: none;
                        border: none;
                        background: none；
                        -webkit-appearance:none;
                    }
                    #su-comment{
                        display: none;
                    }
                    .su-comment-title{
                        font-size: 5vw;
                        margin-bottom: 6vw;
                        font-weight: 600;
                    }
                    .su-comment-input{
                        width: 100%;
                        height: 34vw;
                        background-color: #fafafa;
	                    border-radius: 1vw;
                        border: solid 1px #d9d9d9;
                        padding: 4vw;
                    }
                    .su-comment-input textarea{               
                        width: 100%;
                        height: 100%;
                        font-size:4vw;
                        color: #999999;
                    }
                    .su-comment-list{
                        width: 100%;
                        margin-bottom: 3vw;
                        text-align: center;
                        font-size: 4vw;
                        color: #808080;
                        border-radius: 5vw;
                        border: solid 1px #d9d9d9;
                        height: 11vw;
                        line-height: 11vw
                    }
                    .su-comment-list:focus{
                        outline:none
                    }
                    .su-comment-bottom{
                        width: 100%;
                        border-radius: 1vw;
                        height: 11vw;
	                    background-color: #e6e6e6;
                        color: #999999;
                        font-size: 4vw;
                        margin-top: 3vw;
                    }

                    .su-comment-bottom-active{
                        background-color: #ef4246;
                        color: #ffffff;
                    }
                    .su-comment-list-active{
                        background-color: #fde3e3;
                        color: #ef4246;
                        border: solid 1px #ef4246;
                    }

                    .su-comment-content{
                        display:flex;
                        flex-flow: column nowrap;
                        justify-content: flex-start;
                        align-items: center;
                    }
                    .su-overLay {
                        position: fixed;
                        z-index: 11;
                        height: 100%;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.6);
                    }

                    .su-comment {
                        position: absolute;
                        top: 0;
                        z-index: 999;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    #close {
                        position: absolute;
                        width: 7vw;
                        height: 7vw;
                        right: 0vw;
                        top: -10vw;
                        z-index: 66;
                        background-image: url(./img/close.png); 
                        background-position: top;
                        background-repeat: no-repeat;
                        background-size: 100%;
                    }

                    .su-commentWrap {
                        position: relative;
                        width: 93%;
                        padding: 5vw;
                        z-index: 9999;
                        background-color:#ffffff;
                        border-radius:1vw;
                    }
                `
            var html =
                `               
                    <div class="su-overLay"></div>
                    <div class="su-comment">
                        <div class="su-commentWrap">                         
                            <div id="close"></div>                           
                        </div>
                    </div>
                `
            this.cssSheet(css)
            var pop = document.createElement('div')
            pop.id = "su-comment"
            pop.innerHTML = html
            document.getElementsByTagName('body')[0].appendChild(pop)
            this.pop = pop
        }
    }
    window.Comment = Comment
})