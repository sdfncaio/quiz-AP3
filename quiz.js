// Inicia a variável pra contar quantas já foram respondidas corretamente.
let respondidas = 0;

// Algumas funções só pra encurtar o document.querySelector.
const search = (element) => document.querySelector(element);
const searchAll = (element) => document.querySelectorAll(element);

// A partir daqui começa a construção de elementos, é aqui que a mágica acontece,
// é aqui que o JavaScript lê o arquivo perguntas.js e renderiza cada um dos itens
// que existe lá.
perguntasJson.map((item, index) => {
    // Clonando o modelo de pergunta que está no HTML.
    let perguntaItem = search('.modelo .questaoArea').cloneNode(true);

    // Separando as respostas e embaralhando cada uma delas.
    let respostasLista = item.respostas;
    respostasLista = respostasLista.sort(() => Math.random() - 0.5);

    // Fazendo a substituição de cada elemento pelo conteúdo dos obejetos que
    // vieram do perguntasJson.
    perguntaItem.querySelector('.questao').innerHTML = `Questão ${item.id}`;
    perguntaItem.querySelector('.enunciado').innerHTML = item.pergunta;
    
    // Iniciando a variável que vai impredir a pessoa de responder caso ela
    // já tenha acertado.
    let respondidoCorreto = false;
    
    // Renderização de cada botão diferente.
    perguntaItem.querySelectorAll('.botao').forEach((botao, indexBotao) => {
        // Inicialização da variável para passar ela no switch.
        let letraDaQuestão;

        //Caso o index seja 0, letra A, 1, letra B etc.
        switch (indexBotao) {
            case 0:
                letraDaQuestão = 'A';
                break;
            case 1:
                letraDaQuestão = 'B';
                break;
            case 2:
                letraDaQuestão = 'C';
                break;
            case 3:
                letraDaQuestão = 'D';
                break;
        };

        // Renderizando o conteúdo do botão, colocando a letra e a opção de
        // resposta.
        botao.innerHTML = `${letraDaQuestão} - ${respostasLista[indexBotao][0]}`;

        // Esperando o clique de cada botão, e colocando as propriedades do CSS;
        botao.addEventListener('click', () => {
            if(respondidoCorreto){
                return;
            };
            // Se o botão renderizado tiver o mesmo index que o passado pra
            // variável, então ele é a resposta certa.
            if (respostasLista[indexBotao][1]) {
                // Verifica se a classe ainda não foi adicionada;
                if (!(botao.classList.contains('correta'))) {
                    // Adiciona +1 ao contador e coloca cor verde no botão.
                    respondidas += 1
                    respondidoCorreto = true;
                    botao.classList.add('correta');

                    // Animação para aparecer o Silvio Santos na resposta correta.
                    search('#silvio').style.opacity = 0;
                    search('#silvio').style.display = 'flex';
                    setTimeout(() => {
                        search('#silvio').style.opacity = 1;
                    }, 100);
                    setTimeout(() => {
                        search('#silvio').style.opacity = 0;
                        setTimeout(() => {
                            search('#silvio').style.display = 'none';
                        }, 200);
                    }, 2000);
                };
            } else {
                if (!(botao.classList.contains('errada'))) {
                    // Coloca cor vermelha no botão
                    botao.classList.add('errada');

                    // Fazendo a aleatorização de qual imagem pegar quando errar.
                    let randomChoice = Math.round(Math.random());
                    console.log(randomChoice);
                    let imagem;
                    switch(randomChoice){
                        case 0:
                            imagem = '#faustao';
                            break;
                        case 1:
                            imagem = '#farao';
                            break;
                    };
                    console.log(imagem);
                    // Animação para aparecer a imagem aleatoria quando errar.
                    search(imagem).style.opacity = 0;
                    search(imagem).style.display = 'flex';
                    setTimeout(() => {
                        search(imagem).style.opacity = 1;
                    }, 100);
                    setTimeout(() => {
                        search(imagem).style.opacity = 0;
                        setTimeout(() => {
                            search(imagem).style.display = 'none';
                        }, 200);
                    }, 2000);
                };
            };
            // Se o número de perguntas certas for igual ao número de perguntas
            // dá um alerta.
            if (respondidas === perguntasJson.length) {
                setTimeout(alerta, 200);
            };
        });
    });

    // Adiciona o item de cada pergunta ao escopo da página.
    search('.container').append(perguntaItem);
});

// Função pra fazer o alerta.
const alerta = () => {
    alert('Terminou');
};