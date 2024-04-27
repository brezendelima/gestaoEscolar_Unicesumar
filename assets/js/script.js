document.addEventListener("DOMContentLoaded", function() {
    const alunosTableBody = document.querySelector('#alunosTable tbody');
    const adicionaDadosAlunoBtn = document.getElementById('adicionaDadosAluno');

    let alunos = [];

    // Carregar dados salvos ao carregar a página
    carregarDadosSalvos();

    adicionaDadosAlunoBtn.addEventListener('click', function() {
        const nomeInput = document.getElementById('input_nome');
        const raInput = document.getElementById('input_ra');
        const emailInput = document.getElementById('input_email');
        const input_prova_1 = document.getElementById('input_prova_1');
        const input_prova_integrada_1 = document.getElementById('input_prova_integrada_1');
        const input_aep_1 = document.getElementById('input_aep_1');
        const input_prova_2 = document.getElementById('input_prova_2');
        const input_prova_integrada_2 = document.getElementById('input_prova_integrada_2');
        const input_aep_2 = document.getElementById('input_aep_2');

        // Função calcula as médias dos bimestres
        const mediaBimestral1 = calcularMediaBimestral1(input_prova_1.value, input_aep_1.value, input_prova_integrada_1.value);
        const mediaBimestral2 = calcularMediaBimestral2(input_prova_2.value, input_aep_2.value, input_prova_integrada_2.value);
        const mediaFinal = (mediaBimestral1 + mediaBimestral2) / 2;

        if (!nomeInput.checkValidity() || !raInput.checkValidity() || !emailInput.checkValidity()) {
            alert("Por favor, preencha todos os campos obrigatórios: Nome, RA e E-mail.");
            return;
        }

        const aluno = {
            nome: nomeInput.value,
            ra: raInput.value,
            email: emailInput.value,
            prova1: input_prova_1.value,
            integrada1: input_prova_integrada_1.value,
            aep1: input_aep_1.value,
            media1: mediaBimestral1.toFixed(2), // Esssa linha limita a duas casas decimais
            prova2: input_prova_2.value,
            integrada2: input_prova_integrada_2.value,
            aep2: input_aep_2.value,
            media2: mediaBimestral2.toFixed(2), // Esssa linha limita a duas casas decimais
            mediaFinal: mediaFinal.toFixed(2) // Esssa linha limita a duas casas decimais
        };

        alunos.push(aluno);
        adicionaDadosAluno(aluno);
        salvarDados(); // Salvar os dados ao adicionar um novo aluno
        limparCampos([nomeInput, raInput, emailInput, input_prova_1, input_prova_integrada_1,input_aep_1, input_prova_2, input_prova_integrada_2, input_aep_2]);
    });

    function adicionaDadosAluno(aluno) {
        const row = alunosTableBody.insertRow(); // Linha insere uma nova linha na tabela
        row.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.ra}</td>
            <td>${aluno.email}</td>
            <td>${aluno.prova1}</td>
            <td>${aluno.integrada1}</td>
            <td>${aluno.aep1}</td>
            <td>${aluno.media1}</td>
            <td>${aluno.prova2}</td>
            <td>${aluno.integrada2}</td>
            <td>${aluno.aep2}</td>
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
                salvarDados(); // Salvar os dados ao remover um aluno
            }
        });

        // Permitir edição dos campos diretamente na tabela
        const cells = row.querySelectorAll('td:not(:last-child)'); // Selecionar todas as células exceto a última
        cells.forEach(cell => {
            cell.contentEditable = true;
            cell.addEventListener('blur', function() {
                // Atualizar os dados do aluno quando a edição for concluída
                aluno[cell.cellIndex] = cell.textContent.trim();
                salvarDados(); // Salvar os dados ao editar um aluno
            });
        });
    }

    function limparCampos(inputs) {
        inputs.forEach(input => input.value = '');
    }

    function calcularMediaBimestral1(input_prova_1, input_aep_1, input_prova_integrada_1) {
        input_prova_1 = input_prova_1.trim() !== '' ? parseFloat(input_prova_1) : 0;
        input_aep_1 = input_aep_1.trim() !== '' ? parseFloat(input_aep_1) : 0;
        input_prova_integrada_1 = input_prova_integrada_1.trim() !== '' ? parseFloat(input_prova_integrada_1) : 0;
    
        var media1 = ((input_prova_1 * 0.8) + (input_aep_1 * 0.1) + (input_prova_integrada_1 * 0.1));
        return Math.min(Math.max(media1, 0), 10);
    }
    
    function calcularMediaBimestral2(input_prova_2, input_aep_2, input_prova_integrada_2) {
        input_prova_2 = input_prova_2.trim() !== '' ? parseFloat(input_prova_2) : 0;
        input_aep_2 = input_aep_2.trim() !== '' ? parseFloat(input_aep_2) : 0;
        input_prova_integrada_2 = input_prova_integrada_2.trim() !== '' ? parseFloat(input_prova_integrada_2) : 0;
    
        var media2 = ((input_prova_2 * 0.8) + (input_aep_2 * 0.1) + (input_prova_integrada_2 * 0.1));
        return Math.min(Math.max(media2, 0), 10);
    }

    function salvarDados() {
        localStorage.setItem('alunos', JSON.stringify(alunos));
    }

    function carregarDadosSalvos() {
        const alunosSalvos = JSON.parse(localStorage.getItem('alunos'));
        if (alunosSalvos) {
            alunos = alunosSalvos;
            alunos.forEach(aluno => adicionaDadosAluno(aluno));
        }
    }
});
