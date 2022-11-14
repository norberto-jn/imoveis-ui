const template = {
    item: "<div class=col-lg-6><div class=card><img alt=#nome class=card-img-top src=#imagem><div class=card-body><h5 class=card-title>#nome</h5><p>#detalhe</p><p class=card-text><strong>Valor:</strong>#valor<div class='d-grid gap-2'><a class='btn btn-contact' href='https://api.whatsapp.com/send?phone=55 #whatsapp &text=Olá gostaria de informações sobre o imóvel: #nome' target=_blank>Contato Proprietário</a></div></div></div></div>",
    alert: "<div class='alert alert-warning' role='alert'>Desculpe. Ainda não temos imóveis cadastrados!</div>",
    alert_not_registered: "<div class='row'><div class='col-12'><div class='alert alert-warning' role='alert'>Desculpe. Não temos imóveis para esta categoria.</div></div></div>"
}

//Carregamento AJAX
let ajax = new XMLHttpRequest()
ajax.open("GET", "http://localhost:3000/categorys/search", true)

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

                html_content += '<div class="row"><div class="col-12"><h2><span> </span> ' + data_json[i].categoria + '</h2></div></div>'

                if (data_json[i].imoveis.length == 0) {

                    html_content += template.alert_not_registered

                } else {

                    html_content += '<div class="row">'

                    for (let j = 0; j < data_json[i].imoveis.length; j++) {

                        html_content += card_imoveis(data_json[i].imoveis[j].nome, data_json[i].imoveis[j].imagem, data_json[i].imoveis[j].valor, data_json[i].imoveis[j].whatsapp, data_json[i].imoveis[j].address)

                    }

                    html_content += '</div>'
                }

            }

            content.innerHTML = html_content
            cache_dinamico(data_json)
        }

    }
}

//Template Card Imoveis
var card_imoveis = function (nome, imagem, valor, whatsapp, address) {

    return template.item
        .replace(/#nome/ig, nome)
        .replace(/#imagem/ig, imagem)
        .replace(/#valor/ig, valor)
        .replace(/#whatsapp/ig, whatsapp)
        .replace(/#detalhe/ig, address.logradouro)
}

//Construir o cache dinâmico
var cache_dinamico = function (data_json) {

    if ('caches' in window) {

        console.log("Deletando cache dinâmico antigo")

        caches.delete("imoveis-app-dinamico").then(function () {

            if (data_json.length > 0) {

                var files = ['dados.json']

                for (let i = 0; i < data_json.length; i++) {
                    for (let j = 0; j < data_json[i].imoveis.length; j++) {
                        if (files.indexOf(data_json[i].imoveis[j].imagem) == -1) {
                            files.push(data_json[i].imoveis[j].imagem)
                        }

                    }
                }

            }

            caches.open("imoveis-app-dinamico").then(function (cache) {

                cache.addAll(files).then(function () {

                    console.log("Novo cache dinâmico adicionado!")

                })

            })

        })

    }

}

//Botão de Instalação

let disparoInstalacao = null
const btInstall = document.getElementById("btInstall")

let inicializarInstalacao = function () {

    btInstall.removeAttribute("hidden")
    btInstall.addEventListener('click', function () {

        disparoInstalacao.prompt()

        disparoInstalacao.userChoice.then((choice) => {

            if (choice.outcome === 'accepted') {
                console.log("Usuário realizou a instalação")
            } else {
                console.log("Usuário NÃO realizou a instalação")
            }

        })

    })

}

window.addEventListener('beforeinstallprompt', gravarDisparo)

function gravarDisparo(evt) {
    disparoInstalacao = evt
}