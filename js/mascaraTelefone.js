//a variavel (valor_final_data) recebe o ultimo valor da data
var valor_final_data="";

function mascaraTelefone(){
    var campoTelefone=document.getElementById('whatsapp');
    var valorTelefone=campoTelefone.value;
    var totalCaracter=valorTelefone.toString().length;

    //(switch) para a formataçao  da data
    switch(totalCaracter){
        case 1:campoTelefone.value="("+valorTelefone;
            break;
        case 3:campoTelefone.value=valorTelefone+")"+" ";
            break;
        case 9:campoTelefone.value=valorTelefone+"-";
            break;
        case 14:
             valor_final_data=valorTelefone;
             break;
    }

    //atribui o valor final da data ao campo do input
   if(totalCaracter>14){
       campoTelefone.value=valor_final_data;
   }
}