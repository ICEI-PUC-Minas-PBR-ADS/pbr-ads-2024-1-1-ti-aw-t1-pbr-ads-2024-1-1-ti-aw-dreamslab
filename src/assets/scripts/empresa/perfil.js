document.getElementById('btnFoto').addEventListener ('click', mudaFoto)
function mudaFoto() {
    alert('Alteração indisponível no momento')
}

var login = [
    { id: 1, name: "José Carlos", "email": "josecarlos@gmail.com", "telefone":31999222312, senha: "123456" }
]
function dadosUser(){
    var nome = document.getElementById('nomeInfo')
    var email = document.getElementById('emailInfo')
    var telefone = document.getElementById('telInfo')
    var senha = document.getElementById('senhaInfo')
    var nomeTela = document.getElementById('nomeUser')
    
    nomeTela.innerHTML = `${login[0].name}!`
    nome.value = `${login[0].name}`
    email.value = `${login[0].email}`
    telefone.value = `${login[0].telefone}`
    senha.value = `${login[0].senha}`
}

document.getElementById('atualizaInfo').addEventListener('click', atualizaInfo)
function atualizaInfo() {
    var nome = document.getElementById('nomeInfo').value
    login[0].senha = nome
}

