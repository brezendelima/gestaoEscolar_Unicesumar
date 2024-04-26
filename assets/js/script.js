document.addEventListener("DOMContentLoaded", function() {
    const alunosTableBody = document.querySelector('#alunosTable tbody');
    const adicionaDadosAlunoBtn = document.getElementById('adicionaDadosAluno');
    // const mostraAlunoBtn = document.getElementById('mostraAluno');

    let alunos = [];

    adicionaDadosAlunoBtn.addEventListener('click', function() {
        const nomeInput = document.getElementById('input_nome');
        const raInput = document.getElementById('input_ra');
        const emailInput = document.getElementById('input_email');
        const input_prova_1 = document.getElementById('input_prova_1');
        const input_prova_integrada_1 = document.getElementById('input_prova_integrada_1');
        const input_aep_1 = document.getElementById('input_aep_1');
        const media1 = document.getElementById('media1');
        const input_prova_2 = document.getElementById('input_prova_2');
        const input_prova_integrada_2 = document.getElementById('input_prova_integrada_2');
        const input_aep_2 = document.getElementById('input_aep_2');
        const media2 = document.getElementById('media2');
        const mediaFinal = document.getElementById('mediaFinal');
        // adicionar o resto dos inputs aqui

        if (!nomeInput.checkValidity() || !raInput.checkValidity() || !emailInput.checkValidity()) {
            alert("Por favor, preencha todos os campos obrigatórios: Nome, RA e E-mail.");
            return;
        }

        // verificar se o resto dos inputs vai aqui ou não
        const aluno = {
            nome: nomeInput.value,
            ra: raInput.value,
            email: emailInput.value,
            prova1: input_prova_1.value,
            integrada1: input_prova_integrada_1.value,
            aep1: input_aep_1.value,
            media1: media1.value,
            prova2: input_prova_2.value,
            integrada2: input_prova_integrada_2.value,
            aep2: input_aep_2.value,
            media2: media2,
            mediaFinal: mediaFinal,
        };

        alunos.push(aluno);
        adicionaDadosAluno(aluno);
        limparCampos([nomeInput, raInput, emailInput, input_prova_1, input_prova_integrada_1,input_aep_1, input_prova_2, input_prova_integrada_2, input_aep_2]);
    });

    function adicionaDadosAluno(aluno) {
        const row = alunosTableBody.insertRow(); // Insere uma nova linha na tabela
        row.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.ra}</td>
            <td>${aluno.email}</td>
            <td>${aluno.input_prova_1}</td>
            <td>${aluno.input_prova_integrada_1}</td>
            <td>${aluno.input_aep_1}</td>
            <td>${aluno.media1}</td>
            <td>${aluno.input_prova_2}</td>
            <td>${aluno.input_prova_integrada_2}</td>
            <td>${aluno.input_aep_2}</td>
            <td>${aluno.media2}</td>
            <td>${aluno.mediaFinal}</td>
            <td>
                <button type="button" class="btn btn-remove">Remover</button>
            </td>
        `;

        const btnRemove = row.querySelector('.btn-remove');
        btnRemove.addEventListener('click', function() {
            const index = alunos.findIndex(al => al.nome === aluno.nome && al.ra === aluno.ra && al.email === aluno.email);
            if (index !== -1) {
                alunos.splice(index, 1);
                row.remove();
            }
        });
    }

    function limparCampos(inputs) {
        inputs.forEach(input => input.value = '');
    }

    function calcularMediaBimestral1(input_prova_1, input_aep_1, input_prova_integrada_1) {
        input_prova_1 = input_prova_1.trim() !== '' ? parseFloat(input_prova_1) : 0;
        input_aep_1 = input_aep_1.trim() !== '' ? parseFloat(input_aep_1) : 0;
        input_prova_integrada_1 = input_prova_integrada_1.trim() !== '' ? parseFloat(input_prova_integrada_1) : 0;
    
        var media1 = ((input_prova_1 * 0.8) + (input_aep_1 * 0.1) + (input_prova_integrada_1 * 0.1))/3;
        return Math.min(Math.max(media1, 0), 10);
        // adicionei a divisão por 3
    }
    
    function calcularMediaBimestral2(input_prova_2, input_aep_2, input_prova_integrada_2) {
        input_prova_2 = input_prova_2.trim() !== '' ? parseFloat(input_prova_2) : 0;
        input_aep_2 = input_aep_2.trim() !== '' ? parseFloat(input_aep_2) : 0;
        input_prova_integrada_2 = input_prova_integrada_2.trim() !== '' ? parseFloat(input_prova_integrada_2) : 0;
    
        var media2 = ((input_prova_2 * 0.8) + (input_aep_2 * 0.1) + (input_prova_integrada_2 * 0.1))/3;
        return Math.min(Math.max(media2, 0), 10);
        // adicionei a divisão por 3
    }
    
    function calcularMediaFinal(aluno) {
        // var mediaBimestral1 = calcularMediaBimestral1(aluno.prova1, aluno.aep1, aluno.provaIntegrada1);
        // var mediaBimestral2 = calcularMediaBimestral2(aluno.prova2, aluno.aep2, aluno.provaIntegrada2);
        // return (mediaBimestral1 + mediaBimestral2) / 2;
        var mediaFinal = (media1 + media2)/2;

    };

    // criar método para exibir média
    // criar colunas para exibição de média
});
