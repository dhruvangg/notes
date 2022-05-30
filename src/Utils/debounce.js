export function debounce(fun, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fun.apply(this, args)
        }, timeout)
    }
}