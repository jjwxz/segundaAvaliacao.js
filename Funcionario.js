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

