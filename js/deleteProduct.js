var urlProduct = "http://localhost:3000/product"

function deleteProduct(code) {
    fetch(`${urlProduct}/${code}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`
        }
    })
    return window.location.assign('/imoveis_cadastrados.html')
}