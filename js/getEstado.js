let urlState = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"

let httpState = new XMLHttpRequest()
httpState.open("GET", urlState, true)

httpState.onreadystatechange = function () {
    if (httpState.readyState == 4 && httpState.status == 200) {

        let data_json = JSON.parse(httpState.responseText)

        for (const item of data_json) {
            document.getElementById('uf').innerHTML += '<option value=' + item.sigla + '>' + item.sigla + '</option>'
        }
    }
}

httpState.send()