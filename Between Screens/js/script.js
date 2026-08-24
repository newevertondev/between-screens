const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }

});

document
    .querySelectorAll("#nav-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuBtn.textContent = "☰";

        });

    });

const acessibilidadeBtn =
    document.getElementById("acessibilidade-btn");

const painelAcessibilidade =
    document.getElementById("painel-acessibilidade");

acessibilidadeBtn.addEventListener("click", () => {

    painelAcessibilidade.classList.toggle("active");

});

const fonteMaior =
    document.getElementById("fonte-maior");

const fonteMenor =
    document.getElementById("fonte-menor");

let tamanhoFonte = 100;

fonteMaior.addEventListener("click", () => {

    tamanhoFonte += 10;

    document.body.style.fontSize =
        tamanhoFonte + "%";

});

fonteMenor.addEventListener("click", () => {

    tamanhoFonte -= 10;

    if (tamanhoFonte < 80) {
        tamanhoFonte = 80;
    }

    document.body.style.fontSize =
        tamanhoFonte + "%";

});

const temaBtn =
    document.getElementById("tema-btn");

temaBtn.addEventListener("change", () => {

    document.body.classList.toggle("tema-escuro");

});

const depoimentos = document.querySelectorAll(
    ".carrossel-apoiadores .depoimentos-container"
);

const indicadoresContainer =
    document.querySelector(".indicadores");

let atual = 0;

depoimentos.forEach((_, index) => {

    const bolinha = document.createElement("span");

    bolinha.classList.add("indicador");

    if(index === 0){
        bolinha.classList.add("active");
    }

    bolinha.addEventListener("click", () => {
        mostrarDepoimento(index);
    });

    indicadoresContainer.appendChild(bolinha);
});

const indicadores =
    document.querySelectorAll(".indicador");

function mostrarDepoimento(index){

    depoimentos.forEach(item =>
        item.classList.remove("active")
    );

    indicadores.forEach(item =>
        item.classList.remove("active")
    );

    depoimentos[index].classList.add("active");

    indicadores[index].classList.add("active");

    atual = index;
}

setInterval(() => {

    atual++;

    if(atual >= depoimentos.length){
        atual = 0;
    }

    mostrarDepoimento(atual);

}, 34000);

const perguntas = [
    "Alguém já pediu para você manter segredos dos seus pais ou responsáveis?",
    "Você sente que precisa responder imediatamente para evitar que alguém fique bravo com você?",
    "Alguém online já pediu fotos ou informações pessoais que deixaram você desconfortável?",
    "Você já teve medo de bloquear ou se afastar de alguém na internet?",
    "Alguma pessoa na internet faz você sentir culpa quando não faz o que ela pede?",
    "Alguém diz que você só deve confiar nele ou nela?",
    "Você participa ou participou de grupos que incentivam comportamentos perigosos?",
    "Você já escondeu conversas online por medo da reação de familiares ou responsáveis?",
    "Você conhece pessoalmente todas as pessoas com quem conversa frequentemente pela internet?"
];

let perguntaAtual = 0;
let respostas = [];
let pontuacao = 0;

const perguntaElemento = document.getElementById("pergunta");
const contadorElemento = document.getElementById("contador");
const barra = document.getElementById("progress-bar");
const resultado = document.getElementById("resultado");

function atualizarPergunta() {

    if (perguntaAtual >= perguntas.length) {
        mostrarResultado();
        return;
    }

    perguntaElemento.textContent = perguntas[perguntaAtual];

    contadorElemento.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    barra.style.width =
        `${((perguntaAtual + 1) / perguntas.length) * 100}%`;
}

function responder(valor) {

    respostas[perguntaAtual] = valor;

    perguntaAtual++;

    atualizarPergunta();
}

function voltarPergunta() {

    if (perguntaAtual > 0) {

        perguntaAtual--;

        atualizarPergunta();

    }
}

function mostrarResultado() {

    document.querySelector(".quiz-card").style.display = "none";

    pontuacao = 0;

    respostas.forEach((resposta, indice) => {

        if (indice === 8) {

            if (resposta === 0) {
                pontuacao++;
            }

        } else {

            if (resposta === 1) {
                pontuacao++;
            }

        }

    });

    let mensagem = "";

    if (pontuacao <= 3) {

        mensagem =
            "✅ Baixo risco. Continue atento aos sinais e mantenha hábitos seguros na internet.";

    } else if (pontuacao <= 6) {

        mensagem =
            "⚠️ Atenção. Algumas respostas indicam situações que merecem reflexão e conversa com pessoas de confiança.";

    } else {

        mensagem =
            "🚨 Suas respostas indicam possíveis sinais de alerta. Considere conversar com um responsável, educador ou profissional de apoio.";

    }

    resultado.innerHTML = `
        <h3>Resultado</h3>

        <p>${mensagem}</p>

        <button id="refazer-btn" class="btn-refazer">
            Refazer teste
        </button>
    `;

    document
        .getElementById("refazer-btn")
        .addEventListener("click", reiniciarTeste);
}

function reiniciarTeste() {

    perguntaAtual = 0;
    pontuacao = 0;
    respostas = [];

    resultado.innerHTML = "";

    document.querySelector(".quiz-card").style.display = "block";

    atualizarPergunta();
}

document
    .getElementById("sim-btn")
    .addEventListener("click", () => responder(1));

document
    .getElementById("nao-btn")
    .addEventListener("click", () => responder(0));

document
    .getElementById("voltar-btn")
    .addEventListener("click", voltarPergunta);

atualizarPergunta();