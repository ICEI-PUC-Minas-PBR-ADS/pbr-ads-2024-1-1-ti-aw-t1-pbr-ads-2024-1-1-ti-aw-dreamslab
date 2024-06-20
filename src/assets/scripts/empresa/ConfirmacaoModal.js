function mostrarModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
  }
  
  function fecharModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
  }
  
  function buscarCEP() {
    var cep = document.getElementById("cep").value;
    cep = cep.replace(/\D/g, ''); // Remove caracteres não numéricos
  
    if (cep.length != 8) {
      alert("CEP inválido. Por favor, insira um CEP válido com 8 dígitos.");
      return;
    }
  
    var url = `https://viacep.com.br/ws/${cep}/json/`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.erro) {
          alert("CEP não encontrado. Por favor, verifique o CEP digitado.");
        } else {
          document.getElementById("logradouro").value = data.logradouro;
          document.getElementById("bairro").value = data.bairro;
          document.getElementById("cidade").value = data.localidade;
          document.getElementById("estado").value = data.uf;
        }
      })
      .catch(error => {
        console.error('Erro ao buscar o CEP:', error);
        alert("Ocorreu um erro ao buscar o CEP. Por favor, tente novamente.");
      });
  }