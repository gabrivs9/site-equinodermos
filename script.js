// ACORDEÃO (os marcados com class "aberto" já começam abertos)
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        const conteudo = botao.nextElementSibling;
        const aberto = conteudo.style.display === "block";
        conteudo.style.display = aberto ? "none" : "block";
        botao.querySelector("span").textContent = aberto ? "+" : "−";
    });
});
document.querySelectorAll(".acordeao.aberto .titulo-acordeao").forEach(b => b.click());

// QUIZ
const perguntas = [
    {pergunta: "O nome do filo Echinodermata vem do grego e significa:",
     alternativas: ["Corpo em estrela", "Animal do fundo do mar", "Pele espinhosa", "Pés que andam"],
     correta: 2, explicacao: "Echinodermata quer dizer \"pele espinhosa\", referência aos espinhos presentes na pele de muitos desses animais."},
    {pergunta: "Em que ambiente vivem os equinodermos?",
     alternativas: ["Em rios e lagos", "Somente em água salgada, no mar", "Em água doce e salgada", "Em terra úmida"],
     correta: 1, explicacao: "Os equinodermos são exclusivamente marinhos: não existem espécies de água doce."},
    {pergunta: "Qual é a simetria dos equinodermos adultos?",
     alternativas: ["Bilateral", "Radial (corpo em cinco partes)", "Assimetria total", "Esférica"],
     correta: 1, explicacao: "Os adultos têm simetria radial, geralmente em cinco partes. As larvas, porém, têm simetria bilateral."},
    {pergunta: "Que tipo de esqueleto os equinodermos possuem?",
     alternativas: ["Exoesqueleto de quitina", "Endoesqueleto calcário", "Esqueleto hidrostático apenas", "Não possuem esqueleto"],
     correta: 1, explicacao: "Eles têm um endoesqueleto (interno) formado por placas calcárias sob a pele."},
    {pergunta: "Por qual estrutura a água do mar entra no sistema ambulacrário?",
     alternativas: ["Ampola", "Canal radial", "Madreporito", "Mancha ocular"],
     correta: 2, explicacao: "O madreporito é a placa por onde a água entra e segue para o canal em anel e os canais radiais."},
    {pergunta: "Para que servem os pés ambulacrários?",
     alternativas: ["Para enxergar", "Para andar, prender-se ao fundo e pegar alimento", "Para soltar os gametas", "Para produzir espinhos"],
     correta: 1, explicacao: "Movidos pela pressão da água no sistema ambulacrário, os pés permitem locomoção, fixação e captura de alimento."},
    {pergunta: "Como a estrela-do-mar costuma se alimentar de um molusco?",
     alternativas: ["Filtrando a água", "Raspando algas das pedras", "Projetando o estômago para digerir o alimento fora do corpo", "Absorvendo nutrientes pela pele"],
     correta: 2, explicacao: "A estrela-do-mar projeta o estômago para fora e inicia a digestão do molusco fora do corpo (digestão extracorpórea)."},
    {pergunta: "Como é a reprodução da maioria dos equinodermos?",
     alternativas: ["Sexuada, com fecundação externa na água", "Apenas por brotamento", "Sexuada, com fecundação interna e ovos em terra", "Por esporos"],
     correta: 0, explicacao: "Em geral os sexos são separados e os gametas são liberados na água, onde ocorre a fecundação."},
    {pergunta: "Os equinodermos são evolutivamente próximos de qual grupo?",
     alternativas: ["Artrópodes", "Moluscos", "Cordados", "Cnidários"],
     correta: 2, explicacao: "Equinodermos e cordados são deuterostômios, e por isso são considerados grupos aparentados."},
    {pergunta: "Qual é o papel ecológico dos ouriços-do-mar?",
     alternativas: ["Produzir oxigênio por fotossíntese", "Controlar o crescimento de algas", "Filtrar partículas da água", "Polinizar plantas marinhas"],
     correta: 1, explicacao: "Ao raspar e comer algas, os ouriços ajudam a controlar sua densidade e evitam que cubram os recifes."}
];

let perguntaAtual = 0, pontos = 0;

function mostrarPergunta() {
    const p = perguntas[perguntaAtual];
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = p.pergunta;
    const box = document.getElementById("alternativas");
    box.innerHTML = "";
    p.alternativas.forEach((alt, i) => {
        const b = document.createElement("button");
        b.textContent = `${"ABCD"[i]}) ${alt}`;
        b.onclick = () => verificarResposta(i);
        box.appendChild(b);
    });
    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(i) {
    const p = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll("#alternativas button");
    botoes.forEach(b => b.disabled = true);
    if (i === p.correta) {
        botoes[i].classList.add("correta");
        document.getElementById("feedback").textContent = "Resposta correta! " + p.explicacao;
        pontos++;
    } else {
        botoes[i].classList.add("errada");
        botoes[p.correta].classList.add("correta");
        document.getElementById("feedback").textContent = "Resposta incorreta. " + p.explicacao;
    }
    const prox = document.getElementById("proxima");
    prox.textContent = perguntaAtual === perguntas.length - 1 ? "Ver resultado" : "Próxima pergunta";
    prox.style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    perguntaAtual < perguntas.length ? mostrarPergunta() : mostrarResultado();
}

function mostrarResultado() {
    const msg = pontos === perguntas.length ? "Excelente! Você acertou todas!"
              : pontos >= 7 ? "Muito bom! Ótimo conhecimento sobre equinodermos." : "Vale a pena revisar o conteúdo.";
    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id="refazer" onclick="refazerQuiz()">Refazer quiz</button>`;
}

function refazerQuiz() {
    perguntaAtual = 0; pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p><h3 id="pergunta"></h3><div id="alternativas"></div>
        <p id="feedback"></p><button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>`;
    mostrarPergunta();
}

if (document.getElementById("quiz-container")) mostrarPergunta();
