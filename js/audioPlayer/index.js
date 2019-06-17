const audio = document.getElementById('su-audio')
const play = document.getElementById("su-playButton")
const progressWrap = document.getElementsByClassName("su-progress")[0]
const progressBar = document.getElementsByClassName("su-progress-width")[0]
const display = document.getElementById("su-di")
const progressBarWidth = Number(progressBar.style.width.split('%')[0]) || 0 //进度条宽度
function setClassName(ele, nameFrom, nameTo) {
    const classNameArray = ele.className.split(" ") || []
    if (classNameArray.indexOf(nameTo) > -1) {
        return
    }
    const newClassNameArray = classNameArray.filter(item => item !== nameFrom)
    newClassNameArray.push(nameTo)
    ele.className = newClassNameArray.join(" ")
    console.log(ele.className)
}
var audioPlay = new AudioPlay({
    progressWrap,//进度条父元素
    progressBar, //进度条本体
    audio,  //音频元素
    display, //计时元素
    play, // 播放按钮
    pause: play,//暂停按钮
    isPlayWhentouch: true, //拖动时是否播放
    downloadBar:true,
    addOtherEvent: () => { },
    onTimeUpdate: () => { },
    onPlaying: () => {
        setClassName(play, "su-Icon-play", "su-Icon-pause")
    },
    onPausing: () => {
        setClassName(play, "su-Icon-pause", "su-Icon-play")
    },
    onEnded: () => {
        console.log(1111)
        setClassName(play, "su-Icon-pause", "su-Icon-play")
    }
})