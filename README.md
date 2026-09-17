# 🌿 Jardim de Desejos

Um jardim digital para transformar desejos em sementes: registrar aquilo que se deseja, acompanhar o que já foi conquistado e dar significado a cada pequena realização.

O projeto nasceu como uma **lista de desejos**, mas evoluiu para uma experiência mais simbólica e afetiva — um espaço onde cada objeto pode representar uma intenção, uma história ou um sonho.

## ✨ Arquitetura atual

O **Firestore é a fonte oficial do catálogo em tempo de execução**. Os catálogos mantidos no código (`catalog.js`, `officialCatalog.js` e `gocaseProducts.js`) funcionam como fonte de inicialização/migração e como fallback local quando o Firestore está vazio ou indisponível.

A coleção principal é:

```text
Firestore
└── products
    ├── <productId>
    ├── <productId>
    └── ...
```

Cada produto utiliza um **ID estável**, permitindo executar a migração novamente sem criar documentos duplicados.

## 🧚 Funcionalidades

- 🌱 Catálogo de desejos organizado por ambientes e canteiros
- 🏷️ Categorias e subcategorias
- 💰 Registro de valores de referência
- 🛍️ Loja e link do produto
- 📖 História e significado de cada desejo
- 💭 Registro do sonho associado ao presente
- 🎁 Controle de quantidade desejada e recebida
- ✨ Status como disponível, reservado e realizado
- 🔎 Busca por nome, coleção, sonho, descrição e história
- ↕️ Ordenação por preço e nome
- 🔥 Leitura em tempo real do Firestore
- 🔐 Autenticação administrativa via Firebase Authentication
- 📦 Migração idempotente de todos os catálogos para o Firestore
- 🛡️ Regras do Firestore com leitura pública e escrita administrativa
- 🌿 Fallback local para manter o catálogo visível em caso de indisponibilidade do banco

## 🗂️ Fontes de catálogo

| Fonte | Papel |
|---|---|
| `src/data/catalog.js` | Catálogo base histórico |
| `src/data/officialCatalog.js` | Catálogo oficial consolidado e overrides |
| `src/data/gocaseProducts.js` | Desejos específicos da coleção Gocase |
| `src/services/productMigration.js` | Consolida e grava todos os catálogos no Firestore |
| Firestore `products` | **Fonte oficial em execução** |

A migração atual consolida `officialGardenProducts` e `gocaseProducts`, remove duplicidades por ID e grava os documentos na coleção `products`.

## 👜 Exemplo: coleção Gocase

Entre os desejos cadastrados estão:

| Item | Cor | Valor de referência |
|---|---|---:|
| **Tote Mini — Clear** | Preto | R$ 199,90 |
| **Organizador Tote Bag — Marrom** | Marrom | R$ 39,90 |

Esses itens fazem parte do catálogo de migração e podem ser persistidos no Firestore pelo painel administrativo.

## 🛠️ Tecnologias

- **React 19**
- **Vite 7**
- **JavaScript / ES Modules**
- **Firebase 12**
  - Authentication
  - Firestore
  - Storage
- **CSS**

## 📁 Estrutura principal

```text
jardim-de-desejos/
├── src/
│   ├── components/
│   │   ├── AdminMigrationPanel.jsx
│   │   └── ProductCard.jsx
│   ├── data/
│   │   ├── catalog.js
│   │   ├── officialCatalog.js
│   │   └── gocaseProducts.js
│   ├── firebase/
│   │   └── config.js
│   ├── services/
│   │   └── productMigration.js
│   ├── App.jsx
│   └── main.jsx
├── firestore.rules
├── public/
├── package.json
└── README.md
```

## 🔐 Fluxo administrativo

1. O visitante acessa o Jardim e recebe uma sessão anônima do Firebase Authentication.
2. O aplicativo lê a coleção `products` do Firestore em tempo real.
3. A aplicação utiliza o Firestore como fonte oficial quando existem documentos persistidos.
4. O catálogo local é utilizado como fallback caso o banco esteja vazio ou indisponível.
5. A administradora entra com a conta administrativa configurada no Firebase.
6. O botão **Importar catálogo atual** grava/atualiza todos os produtos dos catálogos oficiais, incluindo os produtos Gocase.
7. Os IDs estáveis impedem a criação de duplicatas durante novas migrações.

## 🚀 Executando localmente

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o ambiente de desenvolvimento

```bash
npm run dev
```

### 3. Gerar a versão de produção

```bash
npm run build
```

### 4. Visualizar o build

```bash
npm run preview
```

## ⚠️ Observação sobre a migração

A correção da versão 2.4 garante que **todos os catálogos utilizados pelo aplicativo sejam incluídos no processo de migração**, e não somente o catálogo oficial anterior.

Depois desta atualização, é necessário executar **uma vez** a ação administrativa **Importar catálogo atual** para persistir no Firestore os produtos que ainda não foram migrados.

A quantidade exibida no painel administrativo representa a quantidade de documentos atualmente lidos da coleção `products`; ela não é uma consulta direta ao conteúdo dos arquivos locais.

## 🌸 Filosofia do projeto

O Jardim de Desejos não é apenas uma lista de compras.

É um registro de **coisas que despertam desejo, significado e intenção** — permitindo olhar para cada conquista como parte de uma história maior.

**Desejar. Cultivar. Conquistar. Florescer.** 🌿✨

---

### 📌 Projeto

**Jardim de Desejos — versão 2.4**

Desenvolvido para transformar uma wishlist em uma experiência pessoal, visual e simbólica.
