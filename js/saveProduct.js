var url = "http://localhost:3000/product"

function saveProduct() {

    const data = JSON.stringify({
        "name": document.getElementById('name').value,
        "whatsapp": document.getElementById('whatsapp').value,
        "value": document.getElementById('value').value,
        "categoryCode": Number(document.getElementById('category').value),
        "image": document.getElementById('image').value,
        "address": {
            "cep": document.getElementById('cep').value,
            "logradouro": document.getElementById('rua').value,
            "bairro": document.getElementById('bairro').value,
            "localidade": document.getElementById('cidade').value,
            "uf": document.getElementById('uf').value
        }
    })

    const http = new XMLHttpRequest()

    http.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(http.status)
            if (http.status == 201) {
                document.getElementById('alert').innerHTML = '<div class="alert alert-success" role="alert">Imovel salvo com sucesso!</div>'
            } else
                document.getElementById('alert').innerHTML = '<div class="alert alert-danger" role="alert">Infelizmente não foi possível salvar o imóvel!</div>'
        }
    })

    http.open("POST", url)
    http.setRequestHeader("Content-Type", "application/json")
    http.send(data)


}
