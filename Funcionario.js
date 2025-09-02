// Classe abstrata Funcionario
class Funcionario {
    #salario;

    constructor(nome, idFuncional, salario) {
        if (this.constructor === Funcionario) {
            throw new Error("Classe abstrata 'Funcionario' não pode ser instanciada.");
        }
        this.nome = nome;
        this.idFuncional = idFuncional;
        this.#salario = salario;
    }

    getSalario() {
        return this.#salario;
    }

    setSalario(novoSalario) {
        if (novoSalario < 0) {
            throw new Error("Salário não pode ser negativo.");
        }
        this.#salario = novoSalario;
    }

    descreverFuncao() {
        throw new Error("Método abstrato 'descreverFuncao' deve ser implementado na subclasse.");
    }
}

/* Teste de Abstração
const funcionario = new Funcionario("Teste", "000", 2000);
console.log(funcionario)
*/

// Classe Especialidade (para agregação)
class Especialidade {
    constructor(nome) {
        this.nome = nome;
    }
}

// Classe Agenda (para composição)
class Agenda {
    constructor(data, descricao, responsavel) {
        this.data = data;
        this.descricao = descricao;
        this.responsavel = responsavel;
    }

    getData() {
        return this.data;
    }

    getDescricao() {
        return this.descricao;
    }

    reagendar(novaData) {
        this.data = novaData
        console.log(`Agendamento reagendado para: ${novaData}`); 
    }
}

// Classe Medico (herda de Funcionario, agregação com Especialidade)
class Medico extends Funcionario {
    constructor(nome, idFuncional, salario) {
        super(nome, idFuncional, salario);
        this.especialidades = [];
    }

    descreverFuncao() {
        return "Médico: Responsável pelo diagnóstico, tratamento e acompanhamento dos pacientes.";
    }

    adicionarEspecialidade(especialidade) {
        if (especialidade instanceof Especialidade) {
            this.especialidades.push(especialidade);
        } else {
            throw new Error("Só é possível adicionar objetos da classe Especialidade.");
        }
    }
}

// Classe Secretaria (herda de Funcionario, composição com Agenda)
class Secretaria extends Funcionario {
    constructor(nome, idFuncional, salario) {
        super(nome, idFuncional, salario);
        this.agendas = [];
    }

    descreverFuncao() {
        return "Secretária: Agendamento de consultas e administração geral da clínica.";
    }

    criarAgendamento(data, descricao, responsavel) {
        const novaAgenda = new Agenda(data, descricao, responsavel);
        this.agendas.push(novaAgenda);
        console.log(`Agendamento criado: ${descricao} em ${data}, com ${responsavel}.`);
    }
}


// Teste de Herança e Encapsulamento
const medicoJoao = new Medico("João", "M201", 10000);
const secretariaBruna = new Secretaria("Bruna", "S475", 2500);

// Teste de encapsulamento
console.log("Salário inicial da Secretária:", secretariaBruna.getSalario());
secretariaBruna.setSalario(3000);
console.log("Salário atualizado da Secretária:", secretariaBruna.getSalario());

// Teste de Polimorfismo
const funcionarios = [medicoJoao, secretariaBruna];
funcionarios.forEach(func => {
    console.log(`${func.nome} - ${func.descreverFuncao()}`);
});

// Teste de Agregação
const especialidadeCardio = new Especialidade("Cardiologia");
const especialidadeDermato = new Especialidade("Dermatologia");

medicoJoao.adicionarEspecialidade(especialidadeCardio);
medicoJoao.adicionarEspecialidade(especialidadeDermato);
console.log("\nMédico com especialidades:", medicoJoao.especialidades);

// Teste de Composição
secretariaBruna.criarAgendamento("02-09-2025", "Check-up", "Dr. João");
secretariaBruna.criarAgendamento("05-09-2025", "Retorno", "Dr. João");
console.log("Agendas atuais:", secretariaBruna.agendas);