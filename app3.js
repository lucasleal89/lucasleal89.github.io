const despesaList = []

/**
 * Função construtora de objetos despesa
 * @param {*} desc
 * @param {*} valor
 */
const Despesa = function(desc = "Não informado", valor = 0) {
    this.descricao = desc
    this.valor = valor
}

/**
 * Adiciona uma nova despesa no array despesas
 */
const criarDespesa = () => {

    const descricao = document.querySelector("#descricao").value
    const valor = parseFloat(document.querySelector("#valor").value)

    // validação simples
    if (descricao === "" || isNaN(valor)) {
        alert("Preencha os campos corretamente!")
        return
    }

    const despesaNova = new Despesa(descricao, valor)

    despesaList.push(despesaNova)

    // limpar campos
    document.querySelector("#descricao").value = ""
    document.querySelector("#valor").value = ""
}

/**
 * Carrega a lista de despesas no HTML
 */
const carregarLista = () => {

    const lista = document.querySelector("#lista")

    lista.innerHTML = ""

    despesaList.forEach((despesa, index) => {

        const div = document.createElement("div")

        div.classList.add("item")

        // texto da despesa
        div.textContent = `${index + 1}. ${despesa.descricao} - R$ ${despesa.valor.toFixed(2)}`

        lista.appendChild(div)
    })
}

/**
 * Gera estatísticas
 */
const gerarEstatisticas = () => {

    const totalDeGastos = despesaList.reduce((total, despesa) => {
        return total + despesa.valor
    }, 0)

    const valores = despesaList.map(despesa => despesa.valor)

    const maiorGasto = Math.max(...valores)
    const menorGasto = Math.min(...valores)

    const media = totalDeGastos / despesaList.length

    // mostrar estatísticas no HTML
    document.querySelector("#total").textContent =
        `Total: R$ ${totalDeGastos.toFixed(2)}`

    document.querySelector("#maior").textContent =
        `Maior gasto: R$ ${maiorGasto.toFixed(2)}`

    document.querySelector("#menor").textContent =
        `Menor gasto: R$ ${menorGasto.toFixed(2)}`

    document.querySelector("#media").textContent =
        `Média: R$ ${media.toFixed(2)}`
}

/**
 * Evento do botão adicionar
 */
const btn = document.querySelector("#btnAdicionar")

btn.addEventListener("click", () => {

    criarDespesa()

    carregarLista()

    if (despesaList.length > 0) {
        gerarEstatisticas()
    }
})