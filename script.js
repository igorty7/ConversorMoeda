let valorUsuario = document.querySelector("#valor")
let moedaUsuario = document.querySelector("#moedas")
let btn = document.querySelector("#btn")
let divContainer = document.querySelector(".converter-card")
let divRes = document.querySelector(".display-res")


const pegarMoeda = () => {
    const moeda = moedaUsuario.value

    if (!valorUsuario.value || !moeda) {
        alert("Por favor, preencha o valor e selecione uma moeda.")
        return
    }

    let fetchAPI = fetch(`https://economia.awesomeapi.com.br/json/last/${moeda}`)
        .then((res) => res.json())
        .then((data) => {
            displayResultado(data, moeda)
        })

        .catch((error) => {
            console.error("Erro ao buscar dados:", error)
            divRes.innerHTML = "<p style='color:red; text-align:center'>Erro ao conectar com a API</p>"
        })
}

const displayResultado = (data, moeda) => {
    const chave = moeda.replace("-", "")
    const valorAtual = data[chave].bid

    const cotacao = (valorAtual * valorUsuario.value).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    })

    divRes.classList.add("style-container")

    divRes.innerHTML = `
        <div class="resultado">
            <p>${chave.replace("BRL", "")} $ ${valorUsuario.value} = </p>
            <p>${cotacao}</p>
        </div>
    `
}

btn.addEventListener("click", pegarMoeda)