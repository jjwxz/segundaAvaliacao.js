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
        console.log(`Agendamento criado com sucesso!`)
    }
}


// Teste de Herança e Encapsulamento
const medico1 = new Medico("João", "M201", 10000);
const secretaria1 = new Secretaria("Bruna", "5475", 2500);

/*
// get e set
console.log("Salário incial da Secretaria:", secretaria1.getSalario());

secretaria1.setSalario(3000);
console.log("Salário atualizado da secretaria:", secretaria1.getSalario());
*/


// Tese de Polimorfismo
const funcionarios = [medico1, secretaria1];

/*
funcionarios.forEach(func => {
  console.log(`${func.nome}: ${func.descreverFuncao()}`);
});
*/

// Teste de Agregação
const cardio = new Especialidade("Cardiologista");
const dermato = new Especialidade("Dermatologista");

medico1.adicionarEspecialidade(cardio);
medico1.adicionarEspecialidade(dermato);

// console.log("Médico com especialidades:", medico1);


// Teste de Composição
/*
secretaria1.criarAgendamento("02-09-2025", "Check-up", "Dr. João");
secretaria1.criarAgendamento("02-09-2025", "Consult do Exame", "Dr. João");

console.log(`Agendamentos: ${secretaria1}´`)
*/
