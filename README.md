
Olá! Rede 

 gostaria de compartilhar com vocês um novo projeto que desenvolvi com ajuda de Matheus Fraga, esse projeto Trata-se de uma aplicação em React com TypeScript, na qual explorei várias tecnologias para construir uma interface que consome uma API de criptomoedas e exibe seus dados de forma interativa.

Consumo da API:
O projeto faz uma requisição à API da CoinCap para obter informações sobre as criptomoedas. Utilizei a função fetch para fazer essa requisição, e, com o uso dos métodos .then(), consegui tratar a resposta e armazenar os dados retornados no estado coins através do hook useState. Esse estado é uma lista que armazena informações como nome da moeda, preço, volume, valor de mercado, entre outros.

Utilização de Hooks:
Usei o useState para gerenciar três estados principais: o estado input, que captura o valor de busca do usuário; coins, que armazena os dados das criptomoedas; e offset, responsável por carregar mais dados da API quando necessário. Para garantir que os dados fossem atualizados conforme o usuário solicita mais informações, implementei o useEffect, que chama a função getData() sempre que o offset é alterado. Além disso, o useNavigate foi fundamental para a navegação entre páginas, permitindo que o usuário veja os detalhes de cada criptomoeda ao enviar o formulário.

Layout e Estilização:
No layout, trabalhei bastante com CSS para garantir uma experiência de usuário agradável. A tabela exibe colunas importantes como "Moeda", "Valor de Mercado", "Preço", "Volume" e "Mudança em 24h". Além disso, cada criptomoeda listada na tabela é um link que direciona para uma página de detalhes, usando o componente Link do React Router.

Roteamento e Navegação:
Implementei o roteamento com a biblioteca react-router-dom, utilizando a função createBrowserRouter para configurar as rotas do projeto. O roteamento inclui uma rota principal que renderiza o componente Layout, uma rota para a página inicial (Home) e outra para exibir detalhes de uma moeda específica (Detail). Também configurei uma rota de fallback que renderiza o componente NotFound para qualquer rota que não corresponda às anteriores.

Detalhes da Moeda:
Um dos componentes mais interessantes é o Detail. Nele, utilizei o hook useParams para obter o parâmetro dinâmico da URL e buscar os dados de uma criptomoeda específica da API. Os dados são formatados e apresentados de forma clara, com destaque para o nome da moeda, preço, volume, e mudança percentual nas últimas 24 horas. Toda essa formatação foi feita usando a API Intl.NumberFormat, o que garante uma apresentação adequada dos números.

O projeto lida bem com o carregamento e exibição de grandes quantidades de dados, além de fornecer uma experiência de navegação fluida. Estou empolgado com os resultados e em como ele pode ser expandido. Se você está interessado em tecnologias como React, TypeScript e APIs, adoraria discutir mais sobre isso e compartilhar experiências!

