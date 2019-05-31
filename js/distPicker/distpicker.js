/**
 * 地区选择器 by suxue in 2019/5/29
 */
(function (window, document) {
    function Scroll(id, params) {
        console.log(id, params)
        this.scroller = document.querySelector(id);
        this.childNode = this.scroller.childNodes[0];
        this.options = {
            step: true,// 是否开启步长模式
            defaultPlace: 0,// 默认列表位置
            callback: null
        };

        this.startPageY = 0;
        this.startTime = 0;
        this.endTime = 0;
        this.offsetTop = 0;//上一次滚动位置

        this.scrollerHeight = this.scroller.clientHeight;//scroller高度
        this.childNodeHeight = this.childNode.clientHeight;//scroller子元素的高度
        this.scrollHeight = this.childNodeHeight - this.scrollerHeight;//滚动高度

        var childNodes = this.childNode.childNodes;
        this.stepLen = childNodes.length > 0 ? childNodes[0].clientHeight : 0;// 步长

        // 设置参数
        for (var i in params) {
            this.options[i] = params[i];
        }

        // 默认列表位置
        var defaultPlace = this.options.defaultPlace ? this.options.defaultPlace : 0;
        this.scrollTo(0, defaultPlace);

        this._start();
        this._move();
        this._end();
        // console.log(this);
    }

    Scroll.prototype = {
        _start: function () {
            var self = this;
            self.scroller.addEventListener('touchstart', function (e) {
                e.stopPropagation();
                e.preventDefault();

                self.startTime = self.getTime();
                var touches = e.touches ? e.touches[0] : e;
                self.startPageY = touches.pageY;//起始触摸点

                self.browserVendor('transition', 'none');
            }, false);
        },

        _move: function () {
            var self = this;
            self.scroller.addEventListener('touchmove', function (e) {
                e.stopPropagation();
                e.preventDefault();

                var timestamp = self.getTime();
                var touches = e.touches ? e.touches[0] : e;

                // 滚动高度
                var diffPageY = touches.pageY - self.startPageY;
                var movePageY = diffPageY + self.offsetTop;

                // 最少移动10px
                if (timestamp - self.endTime > 300 && Math.abs(diffPageY) < 10) {
                    return;
                }

                // 超过边缘滚动有阻力
                if (movePageY > 0) {
                    movePageY /= 3;
                } else if (Math.abs(movePageY) > Math.abs(self.scrollHeight)) {
                    movePageY = Math.abs(self.scrollHeight) - Math.abs(movePageY);
                    movePageY = movePageY / 3 - self.scrollHeight;
                }

                self.browserVendor('transform', 'translate(0, ' + movePageY + 'px)');
            }, false);
        },

        _end: function () {
            var self = this;
            self.scroller.addEventListener('touchend', function (e) {
                e.stopPropagation();
                e.preventDefault();

                self.endTime = self.getTime();
                var duration = self.endTime - self.startTime;

                var touches = e.changedTouches ? e.changedTouches[0] : e;
                var offsetHeight = touches.pageY - self.startPageY;//本次滚动偏移位置
                self.offsetTop += offsetHeight;//记录总偏移位置

                if ((self.offsetTop > 0) || (Math.abs(self.offsetTop) > Math.abs(self.scrollHeight))) {
                    //上边缘&下边缘
                    self.browserVendor('transition', 'all 500ms');
                } else if (duration < 300) { // 惯性滚动
                    var speed = Math.abs(offsetHeight) / duration;// 惯性移动速度
                    var moveTime = duration * speed * 20;// 惯性滚动时间(动画)
                    moveTime = moveTime > 2000 ? 2000 : moveTime;
                    self.offsetTop += offsetHeight * speed * 10;// 惯性移动距离

                    self.browserVendor('transitionProperty', 'all');
                    self.browserVendor('transitionDuration', moveTime + 'ms');
                    self.browserVendor('transitionTimingFunction', 'cubic-bezier(0.1, 0.57, 0.1, 1)');
                } else {
                    self.browserVendor('transition', 'all 500ms');
                }

                if (self.offsetTop > 0) {
                    self.offsetTop = 0;
                } else if (Math.abs(self.offsetTop) > Math.abs(self.scrollHeight)) {
                    self.offsetTop = -self.scrollHeight;
                }

                // 步长模式
                if (self.options.step && self.stepLen > 0) {
                    var nowEndY = self.offsetTop;
                    var h = Math.abs(nowEndY % self.stepLen);//滚动多余不足step的高度
                    var halfHeight = self.stepLen / 2;//step一半的高度

                    //超过行一半的高度，则滚动一行
                    var moveY = (h >= halfHeight) ? (nowEndY - self.stepLen + h) : (nowEndY + h);

                    var index = parseInt(Math.abs(moveY) / self.stepLen);
                    self.options.callback({
                        index: index,
                        node: self.childNode.childNodes,
                        id: self.scroller.id
                    });
                    self.offsetTop = moveY;
                }

                self.browserVendor('transform', 'translate(0, ' + self.offsetTop + 'px)');

            }, false);
        },

        // 滚动到指定位置
        scrollTo: function (x, y, time) {
            var self = this;

            if (time && time > 0) {
                self.browserVendor('transitionProperty', 'all');
                self.browserVendor('transitionDuration', time + 'ms');
                self.browserVendor('transitionTimingFunction', 'cubic-bezier(0.1, 0.57, 0.1, 1)');
            } else {
                self.browserVendor('transition', 'none');
            }

            y = -y;
            self.offsetTop = y;
            self.browserVendor('transform', 'translate(0, ' + y + 'px)');
        },

        // 刷新
        refresh: function () {
            this.childNode = this.scroller.childNodes[0];
            this.startPageY = 0;
            this.startTime = 0;
            this.endTime = 0;
            this.offsetTop = 0;

            this.scrollerHeight = this.scroller.clientHeight;//scroller高度
            this.childNodeHeight = this.childNode.clientHeight;//scroller子元素的高度
            this.scrollHeight = this.childNodeHeight - this.scrollerHeight;//滚动高度

            var childNodes = this.childNode.childNodes;
            this.stepLen = childNodes.length > 0 ? childNodes[0].clientHeight : 0;// 步长

            this.scrollTo(0, 0, 500);
        },

        // 浏览器兼容
        browserVendor: function (styleStr, value) {
            var self = this;
            var vendors = ['t', 'WebkitT', 'MozT', 'msT', 'OT'],
                styleObj,
                len = vendors.length;
            var elementStyle = self.childNode.style;

            for (var i = 0; i < len; i++) {
                styleObj = vendors[i] + styleStr.substr(1);
                if (styleObj in elementStyle) {
                    elementStyle[styleObj] = value;
                    // console.log(styleObj + ' = ' + value);
                }
            }
        },

        // 获取当前时间
        getTime: function () {
            return parseInt(new Date().getTime());
        }
    };
    function DistPicker(params) {
        const defaultParams = {
            nameKey: "name",
            dataEventsList: [],
            scrollSelect: false,
            title: "请选择地区"
        }
        // 传入参数
        for (let key in defaultParams) {
            this[key] = params[key] ? params[key] : defaultParams[key]
        }
        //内置参数 
        this.dataList = []
        this.step = 0
        this.value = []

        // 初始化
        this.init();
    }
    DistPicker.prototype = {
        // 初始化
        init: function () {
            this.dataList[this.step] = this.dataEventsList[this.step]()
            this.createEle()
            var ul = document.getElementsByClassName('su-list-ul')[0]
            var pre = document.getElementById('su-pre')
            var cancel = document.getElementById('su-cancel')
            var wrap = document.getElementById('su-pickerWrap')
            // 点击遮罩层消失
            wrap.addEventListener('click', e => {
                if (e.target.id === "su-pickerWrap") {
                    this.closeList()
                }
            })
            // 取消按钮
            cancel.addEventListener('click', e => {
                this.closeList()
            })
            // 上一步
            pre.addEventListener('click', e => {
                this.pre()
            })
            // 点击li，获取数据并刷新
            ul.addEventListener('click', (e) => {
                // 赋值操作
                this.value[this.step] = e.target.innerText;
                this.step++
                if (this.step < this.dataEventsList.length - 1) {
                    this.dataList[this.step] = this.dataEventsList[this.step](this.value, this.dataList[this.step - 1])
                    this.updatedList(this.dataList[this.step])
                } else {
                    this.dataEventsList[this.step](this.value, this.dataList[this.step - 1])
                    this.closeList(this.dataList[this.dataList.length - 1])
                    return
                }
                e.stopPropagation()
                e.preventDefault()
            })
            this.updatedList(this.dataList[this.step])
        },
        // 每次出现都会删除dom，防止事件堆叠
        createEle: function () {
            var suDistPicker = document.getElementById("su-distPicker");
            if (suDistPicker) {
                suDistPicker.innerHTML = ""
            } else {
                var body = document.getElementsByTagName('body')[0];
                suDistPicker = document.createElement('div');
                suDistPicker.id = "su-distPicker"
                body.appendChild(suDistPicker)
            }

            suDistPicker.innerHTML =
                `
                    <div id="su-pickerWrap"></div>
                    <div id="su-picker">
                    <div class="su-banner">
                        <span id="su-pre">上一步</span>
                        <span>${this.title}</span>
                        <span id="su-cancel">取消</span>
                    </div>
                    <div class="su-list">
                        <ul class="su-list-ul">
                        </ul>
                        </div>
                    </div>
                `
            this.showList()
        },
        // 刷新li列表
        updatedList: function (data) {
            var x = document.getElementsByClassName('su-list-ul')[0]
            x.innerHTML = ""
            if (data.then) {
                this.loading()
                data.then(results => {
                    results.map(item => {
                        var text
                        if (typeof item === "string") {
                            text = item
                        } else if (typeof item === "object") {
                            text = item[this.nameKey]
                        }
                        x.innerHTML = x.innerHTML + `<li>${text}</li>`
                    })
                })
            } else {
                data.map(item => {
                    var text
                    if (typeof item !== "object") {
                        text = item
                    } else if (typeof item === "object") {
                        text = item[this.nameKey]
                    }
                    x.innerHTML = x.innerHTML + `<li>${text}</li>`
                })
            }
        },
        // 展示选择器
        showList: function () {
            var distPicker = document.getElementById('su-picker')
            var distPickerWrap = document.getElementById('su-pickerWrap')
            // 需要延迟触发才会有动画
            setTimeout(() => {
                distPickerWrap.className = "su-pickerWrapIn"
                distPicker.style.height = "250px";

            }, 0)

        },
        loading: function () {
            var x = document.getElementsByClassName('su-list-ul')[0]
            // x.innerHTML = 
        },
        // 关闭选择器
        closeList: function () {
            var distPicker = document.getElementById('su-picker')
            var distPickerWrap = document.getElementById('su-pickerWrap')
            this.step = 0
            distPicker.style.height = 0
            distPickerWrap.className = "su-pickerWrapOut"
            // 需要和动画的时间一致
            setTimeout(() => {
                distPickerWrap.style.display = "none"
            }, 300);

        },
        // 上一步
        pre: function () {
            // 第一步就返回
            if (this.step === 0) {
                return
            }
            this.step--;
            this.value[this.step] = ""
            this.updatedList(this.dataList[this.step])
        },
    }
    window.DistPicker = DistPicker
})(window, document)