document.getElementById('salvar').addEventListener('click', function() {
    const progressBar = document.getElementById('progress-bar');
    const selectedValue = document.getElementById('status').value;
    progressBar.style.width = selectedValue + '%';
    if(selectedValue == '100') {
        const fim = document.getElementById('sinal')
        fim.style.fontSize = '16pt'
        fim.innerHTML = '✔️'
        progressBar.style.background = '#25ce25';
    }
    else if(selectedValue == '66'){
        const fim = document.getElementById('sinal')
        fim.innerHTML = ''
        progressBar.style.background = '#0d9920';
    }
    else if(selectedValue == '33') {
        const fim = document.getElementById('sinal')
        fim.innerHTML = ''
        progressBar.style.background = '#047413';
    }
    else {
        const fim = document.getElementById('sinal')
        fim.innerHTML = ''
        progressBar.style.background = '#02610f';
    }
  });

document.getElementById('cancelar').addEventListener('click',
function() {
    const cancelado = document.getElementById('progress-bar');
    cancelado.style.display = 'none'
    const cancel = document.getElementById('sinal')
    cancel.innerHTML = `CANCELADO`
    cancel.style.fontSize = '32pt'
    cancel.style.fontWeight = 'bolder'
    const statusOff = document.getElementById('status')
    statusOff.style.display = 'none'
    const statusparagrafoOff = document.getElementById('statusParagrafo')
    statusparagrafoOff.style.display = 'none'
    const salvarOff = document.getElementById('salvar')
    salvarOff.style.display = 'none'
    const cancelarOff = document.getElementById('cancelar')
    cancelarOff.style.display = 'none'
});

  