const categorias = {
    lanches: [
        { nome: "Pai do Burguer", preco: 29.90, descricao: "Pão brioche + carne 180g + cheddar + bacon + molho especial" },
        { nome: "X-Burguer Raiz", preco: 21.90, descricao: "Pão + carne 150g + queijo prato" },
        { nome: "X-Salada Supremo", preco: 23.90, descricao: "Carne 150g + queijo + alface + tomate" },
        { nome: "X-Bacon Explosão", preco: 25.90, descricao: "Carne 150g + queijo + bacon em dobro" },
        { nome: "X-Tudo Monstro", preco: 28.90, descricao: "Carne + queijo + bacon + ovo + presunto + milho" },
        { nome: "Frango Crocante", preco: 24.90, descricao: "Frango empanado + queijo + salada" },
        { nome: "Duplo Cheddar", preco: 27.90, descricao: "2 carnes 150g + cheddar cremoso" },
        { nome: "Veggie Burguer", preco: 22.90, descricao: "Hambúrguer vegetal + queijo + salada fresca" },
        { nome: "Bacon Egg Power", preco: 26.90, descricao: "Carne 150g + bacon + ovo + queijo" },
        { nome: "Caipira Especial", preco: 24.90, descricao: "Frango grelhado + milho + molho especial" }
    ],

    combos: [
        { nome: "Combo Pai Supremo", preco: 39.90, descricao: "Pai do Burguer + Batata P + Refri Lata" },
        { nome: "Combo Casal", preco: 69.90, descricao: "2 X-Burguer + 2 Batatas + 2 Refri Lata" },
        { nome: "Combo Bacon Lover", preco: 44.90, descricao: "X-Bacon Explosão + Batata M + Refri 600ml" },
        { nome: "Combo Família", preco: 99.90, descricao: "4 Lanches variados + 2 Batatas G + Refri 2L" }
    ],

    bebidas: [
        { nome: "Coca-Cola Lata", preco: 6.00, descricao: "350ml bem gelada" },
        { nome: "Guaraná Lata", preco: 6.00, descricao: "350ml" },
        { nome: "Coca-Cola 2L", preco: 14.00, descricao: "Garrafa 2 Litros" },
        { nome: "Suco Natural", preco: 8.00, descricao: "Copo 400ml sabores variados" },
        { nome: "Água Mineral", preco: 4.00, descricao: "500ml" }
    ]
};

const container = document.getElementById("produtos");

let contador = 0;

function criarSecao(titulo, lista) {
    container.innerHTML += `
        <div class="titulo-faixa">${titulo}</div>
    `;

    lista.forEach((produto) => {
        container.innerHTML += `
            <div class="item">
                <div class="linha">
                    ${produto.nome}
                    <span>R$ ${produto.preco.toFixed(2)}</span>
                </div>
                <div class="descricao">${produto.descricao}</div>
                <div class="quantidade">
                    Qtd: <input type="number" min="0" value="0" onchange="calcularTotal()" id="qtd-${contador}">
                </div>
            </div>
        `;
        produto.id = contador;
        contador++;
    });
}

criarSecao("LANCHES", categorias.lanches);
criarSecao("COMBOS", categorias.combos);
criarSecao("BEBIDAS", categorias.bebidas);

function calcularTotal() {
    let total = 0;

    Object.values(categorias).flat().forEach((produto) => {
        const qtd = document.getElementById(`qtd-${produto.id}`).value;
        total += qtd * produto.preco;
    });

    document.getElementById("total").innerText = total.toFixed(2);
}

function enviarPedido() {
    const nome = document.getElementById("nomeCliente").value;

    if (!nome) {
        alert("Digite seu nome antes de enviar o pedido!");
        return;
    }

    let mensagem = `Olá meu nome é ${nome} e gostaria de pedir:%0A`;
    let total = 0;

    Object.values(categorias).flat().forEach((produto) => {
        const qtd = document.getElementById(`qtd-${produto.id}`).value;

        if (qtd > 0) {
            mensagem += `- ${qtd}x ${produto.nome}%0A`;
            total += qtd * produto.preco;
        }
    });

    if (total === 0) {
        alert("Selecione pelo menos um item!");
        return;
    }

    mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

    const numero = "5517992839047";
    window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
}