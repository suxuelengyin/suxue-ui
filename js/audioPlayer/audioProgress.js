(function (window, document) {
    function AudioPlay(options) {
        const defaultOptions = {
            downloadBar: false,
            addOtherEvent: function () { },
            onTimeUpdate: function () { },
            onPlaying: function () { },
            onPausing: function () { },
            onEnded: function () { },
        }
        for (key in options) {
            this[key] = options[key] || defaultOptions[key]
        }
        this.allLength = this.progressWrap.offsetWidth
        this.left = this.progressWrap.offsetLeft
        this.loading = true
        this.touchstart = false
        this.load()
        this.isBuffered()
        this.eventList = this.setEventList()
        this.addEvent()
    }
    AudioPlay.prototype = {
        load(){
            this.audio.load()
        },
        get progress() {
            return this.audio.currentTime / this.audio.duration
        },
        set progress(length) {
            this.audio.currentTime = this.audio.duration * length
            return length
        },
        // 是否有缓存
        isBuffered() {
            let buffered = this.audio.buffered
            if (buffered.length) {
                // 获取当前缓冲进度
                // loaded = 100 * buffered.end(0) / myAudio.duration;
                this.loading = false
                this.display.innerHTML = Math.round(this.audio.duration) + "s"
            }
        },
        pauseAudio() {
            this.audio.pause()
        },
        playAudio() {
            if (this.audio.currentTime !== 0) {
                this.audio.play()
                return
            }
            if (this.audio.src) {
                this.audio.play()
            }
        },
        setEventList() {
            return {
                loadedmetadata: (e) => {
                    this.display.innerHTML = Math.round(this.audio.duration) + "s"
                },
                progress: (e) => {
                    console.log(100 * buffered.end(0) / this.audio.duration)
                    let buffered = this.audio.buffered
                    let loaded
                    if (buffered.length > 0) {
                        loaded = 100 * buffered.end(0) / this.audio.duration;
                    }
                    this.loaded = loaded
                    if (loaded === 100) {
                        this.progressBar.style.width = 0 + "px"
                        this.display.innerHTML = Math.round(this.audio.duration) + "s"
                        return
                    }
                    this.display.innerHTML = "加载中"
                    this.progressBar.style.width = loaded / 100 * this.allLength + "px"
                },
                canplaythrough: (e) => {
                    console.log(111)
                    this.loading = false
                },
                timeupdate: (e) => {
                    // 执行回调，起始帧不执行
                    console.log("start")
                    if (this.audio.currentTime !== 0) {
                        this.onPlaying()
                    }
                    // 加载中时，不执行秒数显示
                    if (!this.loading) {
                        this.display.innerHTML = Math.round(this.audio.currentTime) + "s"
                    }
                    // 播放完毕时，设置100%，解决宽度不充满的问题
                    if (this.progress === 1) {
                        this.progressBar.style.width = "100%"
                        return
                    }
                    // 拖曳进度条时,音频继续播放不会设置宽度
                    if (this.touchstart === true) {
                        return
                    }
                    this.progressBar.style.width = this.progress * this.allLength + "px"
                    this.onTimeUpdate()
                },
                pause: (e) => {
                    this.onPausing()
                    this.pauseAudio()
                },
                ended: (e) => {
                    this.onEnded()
                    this.audio.currentTime = 0
                },
                click: (e) => {
                    if (this.audio.paused) {
                        this.playAudio()
                    } else {
                        this.pauseAudio()
                    }
                }
            }
        },
        removeEvent() {
            this.audio.removeEventListener('loadedmetadata', this.eventList.loadedmetadata)
            this.audio.removeEventListener("timeupdate", this.eventList.timeupdate);
            this.audio.removeEventListener("canplaythrough", this.eventList.canplaythrough)
            this.audio.removeEventListener("pause", this.eventList.pause);
            this.audio.removeEventListener("ended", this.eventList.ended)
            this.play.removeEventListener('click', this.eventList.click)
        },
        addEvent() {
            // 防止事件堆叠
            this.removeEvent()
            // 添加自定义事件
            this.addOtherEvent()
            // 元数据加载完后
            this.audio.addEventListener('loadedmetadata', this.eventList.loadedmetadata)
            this.audio.addEventListener('canplaythrough', this.eventList.canplaythrough)
            this.audio.addEventListener("timeupdate", this.eventList.timeupdate);
            this.audio.addEventListener("pause", this.eventList.pause);
            if (this.downloadBar && this.loading) {
                // this.audio.addEventListener("progress", this.eventList.progress);
            }

            this.audio.addEventListener("ended", this.eventList.ended)
            this.play.addEventListener('click', this.eventList.click)
            this.progressWrap.addEventListener('touchstart', (e) => {
                if (status !== '11' && this.direction === 'vertical' && !(parseInt(status, 2) & parseInt(direction, 2)) && e.cancelable) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                this.touchstart = true
                if (!this.isPlayWhentouch) {
                    this.pauseAudio()
                }

                this.trasition(false);
                let x = e.changedTouches[0].pageX;
                let y = e.changedTouches[0].pageY;
                const width = x - this.left
                this.progressBar.style.width = width + "px"
            })
            this.progressWrap.addEventListener("touchmove", (e) => {
                if (status !== '11' && this.direction === 'vertical' && !(parseInt(status, 2) & parseInt(direction, 2)) && e.cancelable) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                let x = e.changedTouches[0].pageX;
                let y = e.changedTouches[0].pageY;
                const width = x - this.left
                if (width >= this.allLength) {
                    return
                }
                this.progressBar.style.width = width + "px"
            })
            this.progressWrap.addEventListener("touchend", (e) => {
                this.touchstart = false
                this.progress = parseInt(this.progressBar.style.width, 10) / this.allLength
                this.playAudio()

            })
        },
        trasition(isTrasition) {
            let newClassNameArray
            const classNameArray = this.progressBar.className.split(" ") || []
            // 不需要过渡
            if (!isTrasition && classNameArray.indexOf("su-barTrasiton") > -1) {
                newClassNameArray = classNameArray.filter(item => item !== "su-barTrasiton")
                // 需要过渡
            } else if (isTrasition) {
                newClassNameArray = [...classNameArray]
                newClassNameArray.push("su-barTrasiton")
            } else {
                return
            }
            const newClassName = newClassNameArray.join(" ")
            this.progressBar.className = newClassName
        }
    }
    window.AudioPlay = AudioPlay
}(window, document))