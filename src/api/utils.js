//防抖
export const debounce = (func, delay) => {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
            clearTimeout(timer)
        }, delay)
    }
}

//随机生成uuid
export const uuidGenerator = () => {
    let originStr = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        originChar = '0123456789abcdef',
        len = originChar.length;
    return originStr.replace(/x/g, function (match) {
        return originChar.charAt(Math.floor(Math.random() * len))
    })
}