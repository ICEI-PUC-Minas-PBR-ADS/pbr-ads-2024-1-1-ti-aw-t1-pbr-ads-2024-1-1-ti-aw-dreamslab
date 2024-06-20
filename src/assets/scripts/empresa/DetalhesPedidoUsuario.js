document.addEventListener('DOMContentLoaded', function() {
    // Captura os parâmetros da URL para obter os dados do pedido
    const urlParams = new URLSearchParams(window.location.search);
  
    // Obtém os valores dos parâmetros da URL
    const formaPagamento = urlParams.get('formaPagamento');
    const enderecoEntrega = urlParams.get('enderecoEntrega');
    const valorAPagar = urlParams.get('valorAPagar');
    const statusPedido = urlParams.get('statusPedido');
  
    // Atualiza os elementos na página de detalhes do pedido
    document.getElementById('forma-pagamento').textContent = formaPagamento || 'Não especificado';
    document.getElementById('endereco-entrega').textContent = enderecoEntrega || 'Não especificado';
    document.getElementById('valor-a-pagar').textContent = parseFloat(valorAPagar).toFixed(2) || '0.00';
    document.getElementById('status-pedido').textContent = statusPedido || 'Pendente';
  });