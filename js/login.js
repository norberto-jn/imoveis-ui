var urlLogin = "https://app-imoveis-api.herokuapp.com/auth/login"

async function getLogin() {

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    if (validateForm(username, password))
        save(username, password)
    else
        document.getElementById('alert').innerHTML = '<div class="alert alert-danger" role="alert">Infelizmente não foi possível salvar o imóvel!</div>'

}

function validateForm(username, password) {
    if (!username, !password)
        return false
    else
        return true
}

function save(username, password) {

    const data = JSON.stringify({
        "username": username,
        "password": password
    })

    const http = new XMLHttpRequest()

    http.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            if (http.status == 200) {
                sessionStorage.setItem('token', JSON.parse(http.responseText).access_token)
                return window.location.assign('/save.html')
            }
            else
                return document.getElementById('alert').innerHTML = '<div class="alert alert-danger" role="alert">Infelizmente não foi possível salvar o imóvel!</div>'
        }
    })

    http.open("POST", urlLogin)
    http.setRequestHeader("Content-Type", "application/json")
    http.send(data)
}
