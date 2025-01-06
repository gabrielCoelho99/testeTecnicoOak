// Elementos do DOM
const formProduto = document.getElementById('formProduto');
const formularioProduto = document.getElementById('formularioProduto');
const listaProdutos = document.getElementById('listaProdutos');
const corpoProdutos = document.getElementById('corpoProdutos');
const botaoNovoProduto = document.getElementById('botaoNovoProduto');

// Armazenamento de produtos
let produtos = [];

// Formulário
function mostrarFormulario() {
    formularioProduto.style.display = 'block';
    listaProdutos.style.display = 'none';
    formProduto.reset();
}

// Mostrar lista de produtos
function mostrarLista() {
    formularioProduto.style.display = 'none';
    listaProdutos.style.display = 'block';
    atualizarListaProdutos();
}

// Adicionar produto
function adicionarProduto(evento) {
    evento.preventDefault();

    const produto = {
        nome: document.getElementById('nomeProduto').value,
        descricao: document.getElementById('descricaoProduto').value,
        valor: parseFloat(document.getElementById('valorProduto').value),
        disponivel: document.querySelector('input[name="disponivel"]:checked').value
    };

    produtos.push(produto);
    
    // Ordenar produtos por valor (do menor para o maior)
    produtos.sort((a, b) => a.valor - b.valor);
    
    // Salvar no localStorage
    localStorage.setItem('produtos', JSON.stringify(produtos));
    
    mostrarLista();
}

// Função para atualizar a lista de produtos
function atualizarListaProdutos() {
    corpoProdutos.innerHTML = '';
    
    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
        `;
        corpoProdutos.appendChild(tr);
    });
}

// Carregar produtos do localStorage ao iniciar a página
function carregarProdutos() {
    const produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
        produtos = JSON.parse(produtosSalvos);
        atualizarListaProdutos();
    }
}

// Event Listeners
formProduto.addEventListener('submit', adicionarProduto);
botaoNovoProduto.addEventListener('click', mostrarFormulario);

// Inicialização
carregarProdutos();
mostrarLista();