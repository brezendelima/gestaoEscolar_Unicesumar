document.getElementById('forumlarioAluno').addEventListener('adicionaDadosAluno', function(event) {
    event.preventDefault();

    const formData = {
        nome: document.getElementById('input_nome').value,
        ra: document.getElementById('input_ra').value,
        email: document.getElementById('input_email').value,
        nota1: document.getElementById('input_prova_1').value,
        integrada1: document.getElementById('input_prova_integrada_1').value,
        aep1: document.getElementById('input_aep_1').value,
        nota2: document.getElementById('input_prova_2').value,
        integrada2: document.getElementById('input_prova_integrada_2').value,
        aep2: document.getElementById('input_aep_2').value,
    };

    // Armazenar dados no LocalStorage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Redirecionar para outra página
    window.location.href = 'exibicao.html';
});
