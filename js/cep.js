function mascara_cep($id) {
    var cep = document.getElementById($id);
    var valor_cep = cep.value;
    var total_cep = valor_cep.toString().length;

    switch (total_cep) {
        case 5:
            cep.value = valor_cep + "-";
            break;
        case 9:
            cep_fixo = cep.value;
            break;
        case 10:
            cep.value = cep_fixo;
            break;
    }
}