const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector('.app__image');
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector(
 '#alternar-musica'
);
const musica = new Audio('./sons/luna-rise-part-one.mp3');

musica.loop = true;

let ultimaMudanca = 0;
musicaFocoInput.addEventListener('change', async () => {
    const mudanca = ++ultimaMudanca;
    if (musicaFocoInput.checked) {
        try {
            await musica.play();
            } catch (erro) {
            if (mudanca !== ultimaMudanca) return;

            console.error('Não foi possível reproduzir o áudio:', erro);
            musicaFocoInput.checked = false;
            }
    } else {
    musica.pause();
    }
});

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active');
});
curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});
longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

const startPauseBt = document.querySelector('#start-pause');
// Cancela o intervalo ativo
function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}
// Executa a contagem regressiva
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar();
        return;
 }
    tempoDecorridoEmSegundos -= 1;
    console.log(
        'Temporizador: ' + tempoDecorridoEmSegundos
 );
    if (tempoDecorridoEmSegundos === 0) {
        zerar();
        alert('Tempo finalizado!');
 }
}
// Inicia ou pausa a contagem
function iniciarOuPausar() {
    if (intervaloId !== null) {
        zerar();
        return;
    }
    if (tempoDecorridoEmSegundos <= 0) {
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
}
// Associa o temporizador ao botão
startPauseBt.addEventListener('click', iniciarOuPausar);

function alterarContexto(contexto) {
    // Remove o destaque de todos os botões
    botoes.forEach((botao) => {
    botao.classList.remove('active');
    });
    
    // Atualiza o contexto e a imagem
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src',`./imagens/${contexto}.png`)
    console.log(`Modo selecionado: ${contexto}`);
    
    switch(contexto){
    case 'foco':
        mensagem = `Otimize sua produtividade,<br>
        <strong class="app__title-strong">
        mergulhe no que importa.</strong>`;
        break;
    case 'descanso-curto':
        mensagem = `Que tal dar uma respirada?
        <strong class="app__title-strong">
        Faça uma pausa curta!</strong>`;
        break;
    case 'descanso-longo':
        mensagem = `Hora de voltar à superfície.
        <strong class="app__title-strong">
        Faça uma pausa longa.</strong>`;
        break;
    default:
        return;
    }
    titulo.innerHTML = mensagem;
};

