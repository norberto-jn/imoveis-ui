var url = "http://localhost:3000/category/sarch"

var http = new XMLHttpRequest()
http.open("GET", url, true)

http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {

        let data_json = JSON.parse(http.responseText)

        for (const item of data_json) {
            document.getElementById('category').innerHTML += '<option value='+item.code+'>'+item.categoria+'</option>'
        }
    }
}

http.send()



