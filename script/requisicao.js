let currentPokemonId = null;

function maiuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function sivenha(pokemon) {
    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (resposta.status === 404 && pokemon !== '') {
            return null;
        } else if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const dados = await resposta.json();
        return dados;
    } catch (error) {
        console.error('Erro: ', error);
    }
}

async function dados_basicos(element) {
    const pokemon = element.value.trim().toLowerCase();
    const searchInput = document.getElementById('search-input');
    const searchBar = document.getElementById('search-bar');

    if (pokemon === '') {
        searchInput.classList.remove('search-input-error');
        searchBar.classList.remove('search-bar-error');
        return;
    }

    const pesquisar = await sivenha(pokemon);

    if (pesquisar) {
        currentPokemonId = pesquisar.id;

        const capitalizedNome = maiuscula(pesquisar.name);
        document.getElementById('poke-nome').textContent = `${currentPokemonId} - ${capitalizedNome}`;
        document.getElementById('sprite').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pesquisar.id}.png`;
        document.getElementById('tipo').textContent = pesquisar.types.map(typeInfo => typeInfo.type.name).join(', ');
        
        const stats = pesquisar.stats;
        document.getElementById('defesa').textContent = stats[2].base_stat;
        document.getElementById('speed').textContent = stats[5].base_stat;
        document.getElementById('hp').textContent = stats[0].base_stat;
        document.getElementById('Satk').textContent = stats[3].base_stat;
        document.getElementById('atk').textContent = stats[1].base_stat;
        document.getElementById('Sdef').textContent = stats[4].base_stat;

        searchInput.classList.remove('search-input-error');
        searchBar.classList.remove('search-bar-error');
    } else {
        searchInput.classList.add('search-input-error');
        searchBar.classList.add('search-bar-error');
    }
}

function diminuirValor() {
    if (currentPokemonId !== null && currentPokemonId > 1) {
        currentPokemonId -= 1;
        const searchBar = document.getElementById('search-bar');
        searchBar.value = currentPokemonId;
        dados_basicos(searchBar);
    }
}

function aumentarValor() {
    if (currentPokemonId !== null) {
        currentPokemonId += 1;
        const searchBar = document.getElementById('search-bar');
        searchBar.value = currentPokemonId;
        dados_basicos(searchBar);
    }
}
