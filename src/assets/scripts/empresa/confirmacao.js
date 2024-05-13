document.addEventListener("DOMContentLoaded", function() {
    const itens = [
      { nome: "Item 1", preco: 10.00 },
      { nome: "Item 2", preco: 20.00 },
      { nome: "Item 3", preco: 15.00 },
      { nome: "Item 4", preco: 10.00 }
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