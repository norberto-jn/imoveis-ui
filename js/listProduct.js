const template = {
    item: `<tr><th scope=row>#code<td>#nome<td>#valor<td onclick='deleteProduct(#code)'><svg height=24 viewBox="0 0 24 24"width=24 xmlns=http://www.w3.org/2000/svg><path d="M0 0h24v24H0z"fill=none /><path d="M7 6V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5zm2-2v2h6V4H9z"fill=rgba(231,76,60,1) /></svg><td><svg height=24 viewBox="0 0 24 24"width=24 xmlns=http://www.w3.org/2000/svg><path d="M0 0h24v24H0z"fill=none /><path d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"fill=rgba(50,152,219,1) /></svg>`
}

//Carregamento AJAX
let ajax = new XMLHttpRequest()
ajax.open("GET", "https://app-imoveis-api.herokuapp.com/categorys/search", true)
ajax.setRequestHeader("Authorization", `Bearer ${window.sessionStorage.getItem('token')}`)

ajax.send()

//Monitorar o retorno requisição
ajax.onreadystatechange = function () {
    //Especificar o container que recebe o conteudo gerado neste arquivo
    let content = document.getElementById("content")

    if (this.readyState == 4 && this.status == 200) {

        let data_json = JSON.parse(ajax.responseText)

        console.log(data_json)

        if (data_json.length == 0) {

            content.innerHTML = template.alert

        } else {

            let html_content = ""

            for (let i = 0; i < data_json.length; i++) {

                if (data_json[i].imoveis.length == 0) {

                    //html_content += template.alert_not_registered

                } else {

                    for (let j = 0; j < data_json[i].imoveis.length; j++) {

                        html_content += card_imoveis(data_json[i].imoveis[j].code, data_json[i].imoveis[j].nome, data_json[i].imoveis[j].imagem, data_json[i].imoveis[j].valor, data_json[i].imoveis[j].whatsapp, data_json[i].imoveis[j].address)

                    }

                }

            }

            content.innerHTML = html_content

        }

    }
}

//Template Card Imoveis
var card_imoveis = function (code, nome, imagem, valor, whatsapp, address) {

    return template.item
        .replace(/#nome/ig, nome.toLocaleUpperCase())
        .replace(/#code/ig, code)
        .replace(/#imagem/ig, imagem)
        .replace(/#valor/ig, valor)
        .replace(/#whatsapp/ig, whatsapp)
        .replace(/#detalhe/ig, address.logradouro)
}