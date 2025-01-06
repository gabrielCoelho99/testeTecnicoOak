// Elementos do DOM
const formProduto = document.getElementById('formProduto');
const formularioProduto = document.getElementById('formularioProduto');
const listaProdutos = document.getElementById('listaProdutos');
const corpoProdutos = document.getElementById('corpoProdutos');
const botaoNovoProduto = document.getElementById('botaoNovoProduto');

// Armazenamento de produtos
let produtos = [];
let produtoEditandoId = null;

// Formulário
function mostrarFormulario(produto = null) {
    formularioProduto.style.display = 'block';
    listaProdutos.style.display = 'none';
    formProduto.reset();

    if (produto) {
        // Preencher formulário com dados do produto
        document.getElementById('nomeProduto').value = produto.nome;
        document.getElementById('descricaoProduto').value = produto.descricao;
        document.getElementById('valorProduto').value = produto.valor;
        document.querySelector(`input[name="disponivel"][value="${produto.disponivel}"]`).checked = true;
        produtoEditandoId = produto.id;
    } else {
        produtoEditandoId = null;
    }
}

// Mostrar lista de produtos
function mostrarLista() {
    formularioProduto.style.display = 'none';
    listaProdutos.style.display = 'block';
    atualizarListaProdutos();
}

// Gerar ID
function gerarId() {
    return Date.now().toString();
}

// Adicionar/Editar/Remover produto
function salvarProduto(evento) {
    evento.preventDefault();

    const produto = {
        id: produtoEditandoId || gerarId(),
        nome: document.getElementById('nomeProduto').value,
        descricao: document.getElementById('descricaoProduto').value,
        valor: parseFloat(document.getElementById('valorProduto').value),
        disponivel: document.querySelector('input[name="disponivel"]:checked').value
    };

    if (produtoEditandoId) {
        // Editar produto existente
        const index = produtos.findIndex(p => p.id === produtoEditandoId);
        if (index !== -1) {
            produtos[index] = produto;
        }
    } else {
        // Adicionar novo produto
        produtos.push(produto);
    }
    
    // Ordenar produtos por valor (do menor para o maior)
    produtos.sort((a, b) => a.valor - b.valor);
    
    // Salvar no localStorage
    localStorage.setItem('produtos', JSON.stringify(produtos));
    
    mostrarLista();
}

// Função para editar um produto
function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        mostrarFormulario(produto);
    }
}

// Função para remover um produto
function removerProduto(id) {
    if (confirm('Tem certeza que deseja remover este produto?')) {
        produtos = produtos.filter(p => p.id !== id);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        atualizarListaProdutos();
    }
}

//Atualização de produtos
function atualizarListaProdutos() {
    corpoProdutos.innerHTML = '';
    
    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td class="acoes">
                <button onclick="editarProduto('${produto.id}')" class="botao-editar">
                    Editar
                </button>
                <button onclick="removerProduto('${produto.id}')" class="botao-remover">
                    Remover
                </button>
            </td>
        `;
        corpoProdutos.appendChild(tr);
    });
}

// Localstorage quando iniciar
function carregarProdutos() {
    const produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
        produtos = JSON.parse(produtosSalvos);
        atualizarListaProdutos();
    }
}

// Eventos
formProduto.addEventListener('submit', salvarProduto);
botaoNovoProduto.addEventListener('click', () => mostrarFormulario());

// Carregar o app
carregarProdutos();
mostrarLista();