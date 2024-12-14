# Liquid JS

Liquid JS é uma linguagem de template open-source usada para gerar conteúdo dinâmico em páginas web. Originalmente criada para plataformas como Shopify, ela permite separar a lógica da apresentação, tornando o desenvolvimento web mais organizado e seguro.

## Como Funciona o Liquid JS?

O Liquid JS permite que você insira lógica e manipule dados dentro de templates HTML de maneira eficiente. A linguagem é baseada em três componentes principais: **tags**, **filtros** e **variáveis**.

### 1. Tags
As tags são usadas para realizar ações e controlar o fluxo da lógica no template. Elas são envolvidas por `{% %}`.

#### Exemplos:
- **Condicional (if):**
  ```liquid
  {% if user %}
    Olá, {{ user.name }}!
  {% endif %}


- **Repetição (for)**
  ```liquid
  {% for product in collection.products %}
    <p>{{ product.name }}</p>
  {% endfor %}

### 2. Filtros
Filtros são usados para modificar os valores das variáveis dentro do template. Eles são aplicados usando o pipe (|).
- **Filtro (|):**
  ```liquid
  {{ "olá mundo" | upcase }}
