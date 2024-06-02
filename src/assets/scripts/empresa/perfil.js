document.getElementById('btnFoto').addEventListener ('click', mudaFoto)
function mudaFoto() {
    alert('Alteração indisponível no momento')
}

document.getElementById('atualizaInfo').addEventListener('click', atualizaInfo)
function atualizaInfo() {
    var nome = document.getElementById('nomeInfo').value
    var nomeTela = document.getElementById('nomeUser')
    nomeTela.innerHTML = `${nome}!`
}