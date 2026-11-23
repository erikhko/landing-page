# InfoTech //store

Landing page de uma loja fictícia de hardware e periféricos. É um site estático, feito com HTML, CSS e JavaScript puros, sem frameworks, sem etapa de build e sem back-end. O foco é a experiência visual (tema escuro "cyber", animações e interações) e um fluxo de compra simulado: catálogo, carrinho, comparador, configurador de PC e checkout.

> **Projeto de demonstração.** A marca, os produtos, os preços e os números exibidos são fictícios. Nenhum pedido é processado de verdade.

## Funcionalidades

- **Hero animado** com chip 3D que acompanha o mouse, métricas simuladas (temperatura, clock, FPS) e contadores animados.
- **Categorias em layout bento**: cards para Placas de Vídeo, Memória RAM, Processadores, Periféricos, Armazenamento, Monitores e Áudio. Ao clicar, o catálogo é filtrado pela categoria.
- **Catálogo de produtos** (16 itens) com:
  - busca por nome, categoria ou especificação (atalho `/` para focar o campo);
  - filtro por categoria (chips);
  - ordenação por relevância, menor preço, maior preço e melhor avaliados;
  - selo de promoção (desconto calculado), "NOVO" ou "EM ALTA";
  - preço parcelado em 12x e preço no PIX (8% de desconto).
- **Carrinho** (gaveta lateral): alterar quantidade, remover itens, cupom, barra de frete grátis e checkout simulado.
- **Comparador de produtos**: seleciona de 2 a 3 itens e mostra uma tabela lado a lado, destacando o menor preço.
- **Configurador "Monte seu PC"**: escolha de CPU, GPU, RAM e SSD, com cálculo em tempo real de performance, consumo, fonte sugerida e total do setup. Inclui um kit base (placa-mãe, gabinete e fonte).
- **Oferta relâmpago** com cronômetro regressivo e estoque que diminui a cada compra.
- **Benefícios, FAQ e newsletter** (o formulário só exibe uma confirmação).
- **Efeitos visuais**: fundo de partículas interativo em canvas, aurora, grão, efeito tilt com spotlight nos cards, botões magnéticos, revelação ao rolar a página, barra de progresso de leitura e cursor personalizado.
- **Persistência local**: carrinho, cupom, itens do comparador e término da oferta ficam salvos no `localStorage`.

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, grid, animações, `backdrop`, gradientes)
- JavaScript (ES6+) em um único arquivo, sem dependências
- Fontes do Google Fonts: Space Grotesk, JetBrains Mono e Unbounded (exigem conexão com a internet)

## Como executar

Não há instalação nem build. Use um destes caminhos:

1. Abra o `index.html` direto no navegador (duplo clique), ou
2. Sirva a pasta com um servidor estático local, por exemplo:

```bash
# Python
python -m http.server 8080

# ou Node.js
npx serve .
```

Depois acesse `http://localhost:8080`.

## Estrutura do projeto

```
landing-page/
├── index.html   # Estrutura da página, seções, modais e créditos das imagens
├── styles.css   # Tema, layout, componentes, animações e responsividade
├── app.js       # Dados dos produtos e toda a lógica da interface
├── img/         # Fotos dos produtos (p1.jpg a p16.jpg)
└── README.md
```

### Seções da página

| Âncora | Conteúdo |
|---|---|
| `#top` | Hero e faixa de destaques (marquee) |
| `#categorias` | Grade bento de categorias |
| `#produtos` | Catálogo com busca, filtros e ordenação |
| `#builder` | Configurador "Monte seu PC" |
| `#ofertas` | Oferta relâmpago |
| `#faq` | Perguntas frequentes |

### Organização do `app.js`

O arquivo é uma função auto-executável dividida em blocos comentados:

| Bloco | Responsabilidade |
|---|---|
| `DATA` | Categorias (`CATS`) e lista de produtos (`P`) |
| `ART (SVG)` | Ilustrações em SVG geradas por código, usadas como reserva das fotos |
| `TOAST` | Notificações rápidas |
| `CATALOG` | Renderização, busca, filtros e ordenação |
| `CART` | Carrinho, cupom e checkout simulado |
| `COMPARE` | Seleção e tabela de comparação |
| `OVERLAYS` | Abertura e fechamento de gaveta e modais (`Esc` fecha) |
| `BUILDER` | Configurador de PC |
| `DEAL` | Cronômetro e estoque da oferta |
| `NEWSLETTER` | Formulário de e-mail |
| `EFFECTS` | Tilt, botões magnéticos, contadores, rolagem e fundo de partículas |

## Como personalizar

### Adicionar um produto

Inclua um objeto no array `P` em `app.js`:

```js
{ id: 17, name: 'Nome do produto', cat: 'gpu', art: 'gpu', price: 1999, old: 2499,
  rating: 4.5, tag: 'new', pf: 20, w: 150,
  specs: [['Spec 1', 'valor'], ['Spec 2', 'valor'], ['Spec 3', 'valor'], ['Spec 4', 'valor']] }
```

| Campo | Descrição |
|---|---|
| `id` | Identificador único (também define a imagem `img/p<id>.jpg`) |
| `cat` | Categoria: `gpu`, `cpu`, `ram`, `armazenamento`, `periferico`, `monitor` ou `audio` |
| `art` | Ilustração SVG de reserva: `gpu`, `cpu`, `ram`, `ssd`, `keyboard`, `mouse`, `headset` ou `monitor` |
| `price` / `old` | Preço atual e preço antigo (opcional, gera o selo de desconto) |
| `rating` | Avaliação de 0 a 5 |
| `tag` | Opcional: `hot` (EM ALTA) ou `new` (NOVO) |
| `pf` / `w` | Pontos de performance e consumo em watts (usados no configurador) |
| `specs` | Lista de pares `[rótulo, valor]`; os 3 primeiros aparecem no card |

Adicione a foto em `img/p17.jpg`. Se a imagem não carregar, a ilustração SVG aparece no lugar.

### Adicionar uma categoria

1. Inclua a chave e o nome no objeto `CATS` em `app.js`.
2. Crie um card em `#categorias` no `index.html` com `data-cat="<chave>"`. Use `b-big` ou `b-wide` para os tamanhos maiores e mantenha a soma das células da grade de 4 colunas fechada.

### Configurador de PC

Edite o array `STEPS` (peças e ids de produto disponíveis em cada etapa), o objeto `pick` (seleção inicial) e as constantes `BASE_W` e `BASE_PRICE` (kit base).

### Cupom e frete

- Cupom de 10%: `INFO10` (busca por `INFO10` em `app.js`).
- Frete grátis acima de R$ 499 (constante usada em `renderCart`).

## Limitações conhecidas

- Não há back-end: checkout, newsletter e pedidos são simulados.
- O configurador estima desempenho e consumo, mas **não valida compatibilidade** entre as peças.
- Os dados ficam só no navegador (`localStorage`) e não são compartilhados entre dispositivos.
- Não há testes automatizados.

## Créditos das imagens

As fotos dos produtos vêm do Wikimedia Commons, sob licenças Creative Commons, e são ilustrativas (os modelos da loja são fictícios). A lista completa de autores e licenças está no rodapé do próprio site, em "Créditos das imagens", no `index.html`.
