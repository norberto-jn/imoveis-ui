var url = "http://localhost:3000/product"

function saveProduct() {

    const data = JSON.stringify({
        "name": document.getElementById('name').value,
        "whatsapp": document.getElementById('whatsapp').value,
        "value": document.getElementById('value').value,
        "categoryCode": Number(document.getElementById('category').value),
        "image": document.getElementById('image').value
    })

    const http = new XMLHttpRequest()

    http.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(http.status)
        }
    })

    http.open("POST", url)
    http.setRequestHeader("Content-Type", "application/json")
    console.log(data)
    http.send(data)


}
