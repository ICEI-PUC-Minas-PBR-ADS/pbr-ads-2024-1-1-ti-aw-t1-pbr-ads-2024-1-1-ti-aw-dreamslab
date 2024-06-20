function selectDeliveryOption(option) {

  var cards = document.querySelectorAll('.card');
  cards.forEach(function(card) {
    card.classList.remove('selected');
  });

  var selectedCard = document.querySelector('.card[for="' + option + '"]');
  selectedCard.classList.add('selected');

}
function loadPage() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        document.getElementById("content").innerHTML = xhr.responseText;
      } else {
        console.error('Ocorreu um erro ao carregar a página.');
      }
    }
  };
  xhr.open('GET', 'sua_pagina.html', true);
  xhr.send();
}

document.addEventListener("DOMContentLoaded", function() {
  const itens = [
    { nome: "Item 1", preco: 10.00 },
    { nome: "Item 2", preco: 20.00 },
    { nome: "Item 3", preco: 15.00 },
    { nome: "Item 5", preco: 40.00 },
    { nome: "Item 6", preco: 80.00 },
    { nome: "Item 7", preco: 90.00 },
  ];

  const listaItens = document.getElementById("lista-itens");
  const totalValor = document.getElementById("total-valor");

  let total = 0;

  itens.forEach(item => {
    const divItem = document.createElement("div");
    divItem.classList.add("item");

    const spanNome = document.createElement("span");
    spanNome.textContent = item.nome;

    const spanPreco = document.createElement("span");
    spanPreco.textContent = `$${item.preco.toFixed(2)}`;

    total += item.preco;

    divItem.appendChild(spanNome);
    divItem.appendChild(spanPreco);
    listaItens.appendChild(divItem);
  });

  totalValor.textContent = total.toFixed(2);
});