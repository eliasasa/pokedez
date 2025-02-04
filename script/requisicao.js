let currentPokemonId = null;

function maiuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function sivenha(pokemon) {
    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (resposta.status === 404 && pokemon !== '') {
            if (pokemon === 'miku') {
                return {
                    id: 'lepolepo',
                    name: 'Hatsune Miku',
                    sprites: { other: { home: { front_default: './images/others/miku.gif' } } },
                    types: [{ type: { name: 'God' } }],
                    stats: [
                        { base_stat: 999 }, 
                        { base_stat: 999 }, 
                        { base_stat: 999 },
                        { base_stat: 999 }, 
                        { base_stat: 999 }, 
                        { base_stat: 999 }  
                    ]
                };
            }
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
        document.getElementById('sprite').src = pesquisar.sprites.other.home.front_default;
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

const songs = [
    {src: './music/song1.mp3', name: 'Pokémon GO - Gym Leader Battle Music (HQ)'},
    { src: './music/song2.mp3', name: '【ポケモン feat. 初音ミク】ミライどんなだろう ⧸ Mitchie M.mp3'},
    { src: './music/song3.mp3', name: 'Pokémon Black & White - N Final Battle Music'},
    { src: './music/song4.mp3', name: "Amidst the Grave's Demons - Suck My 401k ft. Chris Linck"},
    { src: './music/song5.mp3', name: 'El Soldado Trifaldón'}
];

let musga = 0;

const audioPlayer = document.getElementById('audio-player');
const songTitle = document.getElementById('song-title');
const musicPlayer = document.querySelector('.music-player');

function prox() {
    musga = (musga + 1) % songs.length;
    updatePlayer();
}

function ante() {
    musga = (musga - 1 + songs.length) % songs.length;
    updatePlayer();
}

function updatePlayer() {
    audioPlayer.src = songs[musga].src;
    songTitle.textContent = `Tocando: ${songs[musga].name}`;
    audioPlayer.play();
    marquee();
}

function escondidinho() {
    if (musicPlayer.classList.contains('show')) {
        musicPlayer.classList.remove('show');
    } else {
        musicPlayer.classList.add('show');
    }
}

function marquee() {
    songTitle.style.animation = 'none';
    setTimeout(function () {
        songTitle.style.animation = '';
    }, 10);
}

document.addEventListener('DOMContentLoaded', function () {
    audioPlayer.src = songs[musga].src;
    songTitle.textContent = `Tocando: ${songs[musga].name}`;
    musicPlayer.classList.remove('show');
    audioPlayer.volume = 0.1;
    
    function playMusic() {
        const playPromise = audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('A música começou a tocar automaticamente');
            }).catch(error => {
                console.log('A reprodução automática falhou:', error);
            });
        }
        document.removeEventListener('click', playMusic);
    }

    document.addEventListener('click', playMusic);

    audioPlayer.addEventListener('ended', prox); 
});






