let urlCategory = "http://localhost:3000/categorys"

let httpCategory = new XMLHttpRequest()
httpCategory.open("GET", urlCategory, true)

httpCategory.onreadystatechange = function () {
    if (httpCategory.readyState == 4 && httpCategory.status == 200) {

        let data_json = JSON.parse(httpCategory.responseText)

        for (const item of data_json) {
            document.getElementById('category').innerHTML += '<option value=' + item.code + '>' + item.categoria + '</option>'
        }
    }
}

httpCategory.send()



