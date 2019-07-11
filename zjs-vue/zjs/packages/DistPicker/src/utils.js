export function promiseCallback(promise, callback) {
    if (!promise) {
        callback(promise)
        return
    }
    if (promise.then) {
        promise.then(data => {
            callback(data)
        })
    } else {
        callback(promise)
    }
}
export function changeDeepDataInArray(data=[],changeData={},deep=0){
    data.forEach((item,index)=>{
        
    })
}