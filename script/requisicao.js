async function sivenha(pokemon) {
    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (resposta.status === 404) {
            window.alert('Pókemon não encontrado')
            return null;
        } else if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const dados = await resposta.json();
        return dados;
    } catch (error) {
        console.error('Erro: ', error);
    }
};

async function dados_basicos(event) {
    event.preventDefault()
    const pokemon = document.getElementById("pokemun").value;
    const pesquisar = await sivenha(pokemon);
    if (pesquisar) {
        const nome = pesquisar.name;
        const foto = pesquisar.sprites.front_default
        document.write(`<p>${nome}<p>`);
        document.write(`<image src="${foto}"><image>`);
    }
};

document.getElementById('search').addEventListener('submit', dados_basicos)