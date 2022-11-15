var urlProduct = "https://app-imoveis-api.herokuapp.com/product"

function deleteProduct(code) {
    fetch(`${urlProduct}/${code}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`
        }
    })
    return window.location.assign('/imoveis_cadastrados.html')
}