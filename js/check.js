function check() {
    const token = window.sessionStorage.getItem('token')

    if (!token)
        return window.location.assign('/index.html')
}