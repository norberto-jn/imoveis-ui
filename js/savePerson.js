var urlProduct = "https://app-imoveis-api.herokuapp.com/person"

async function savePerson() {

    const name = document.getElementById('name').value
    const cpf = document.getElementById('cpf').value
    const cnpj = document.getElementById('cnpj').value
    const email = document.getElementById('email').value
    const phone = document.getElementById('phone').value
    const password = document.getElementById('password').value

    if (validateForm(name, cpf, cnpj, email, phone, password))
        save(name, cpf, cnpj, email, phone, password)
    else
        document.getElementById('alert').innerHTML = '<div class="alert alert-danger" role="alert">Infelizmente não foi possível fazer o cadastro!</div>'

}

function validateForm(name, cpf, cnpj, email, phone, password) {

    if (!name, !cpf, !cnpj, !email, !phone, !password)
        return false
    else
        return true
}

function save(name, cpf, cnpj, email, phone, password) {

    const data = JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        cnpj: cnpj,
        cpf: cpf,
        password: password
    })

    const http = new XMLHttpRequest()

    http.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            if (http.status == 201)
                return document.getElementById('alert').innerHTML = '<div class="alert alert-success" role="alert">Cadastro feito com sucesso!</div>'
            else
                return document.getElementById('alert').innerHTML = '<div class="alert alert-danger" role="alert">Infelizmente não foi possível fazer o cadastro!</div>'
        }
    })

    http.open("POST", urlProduct)
    http.setRequestHeader("Content-Type", "application/json")
    http.send(data)
}
