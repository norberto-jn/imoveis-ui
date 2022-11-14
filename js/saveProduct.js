var urlProduct = "http://localhost:3000/product"

async function saveProduct() {

    const name = document.getElementById('name').value
    const whatsapp = document.getElementById('whatsapp').value
    const money = document.getElementById('value').value
    const categoryCode = Number(document.getElementById('category').value)
    const image = document.getElementById('image').value
    const cep = document.getElementById('cep').value
    const logradouro = document.getElementById('rua').value
    const bairro = document.getElementById('bairro').value
    const localidade = document.getElementById('cidade').value
    const uf = document.getElementById('uf').value

    if (validateForm(name, whatsapp, money, categoryCode, image, cep, logradouro, bairro, localidade, uf))
        save(name, whatsapp, money, categoryCode, image, cep, logradouro, bairro, localidade, uf)
    else
        document.getElementById('alert').innerHTML = '<div class="alert alert-danger" role="alert">Infelizmente não foi possível salvar o imóvel!</div>'

}

function validateForm(name, whatsapp, money, categoryCode, image, cep, logradouro, bairro, localidade, uf) {

    if (!name, !whatsapp, !money, !categoryCode, !image, !cep, !logradouro, !bairro, !localidade, !uf)
        return false
    else
        return true
}

function save(name, whatsapp, money, categoryCode, image, cep, logradouro, bairro, localidade, uf) {

    const data = JSON.stringify({
        "name": name,
        "whatsapp": whatsapp,
        "value": money,
        "categoryCode": categoryCode,
        "image": image,
        "address": {
            "cep": cep,
            "logradouro": logradouro,
            "bairro": bairro,
            "localidade": localidade,
            "uf": uf
        }
    })

    const http = new XMLHttpRequest()

    http.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            if (http.status == 201)
                return document.getElementById('alert').innerHTML = '<div class="alert alert-success" role="alert">Imovel salvo com sucesso!</div>'
            else
                return document.getElementById('alert').innerHTML = '<div class="alert alert-danger" role="alert">Infelizmente não foi possível salvar o imóvel!</div>'
        }
    })

    http.open("POST", urlProduct)
    http.setRequestHeader("Content-Type", "application/json")
    http.setRequestHeader("Authorization", `Bearer ${window.sessionStorage.getItem('token')}`)
    http.send(data)
}
