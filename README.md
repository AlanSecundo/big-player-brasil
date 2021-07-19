## [https://big-player-brasil.netlify.app/](Clique aqui e acesse a DEMO)

## Primeiros passos:

Logo após clonar o projeto, siga os seguintes passos abaixo:

### `yarn install`

Irá instalar todas as dependências do projeto.

### `yarn start`

Irá rodar a aplicação em "develop mode" normalmente no link: [http://localhost:3000](http://localhost:3000).

## Acessos

### Tipos de acesso:

Existem dois tipos de usuários na aplicação, um deles corresponde aos candidatos, outro aos avaliadores, para 
acessar como um candidato, basta utilizar um nome de usuário chamado 'login' em seguida de um número entre 5 e 50, a senha será 'password {número corrrespondente ao do login}.

Exemplos: (login: login 10) (senha: password 10), (login: login 23) (senha: password 23)

Sim, a senha e o login tem espaço, pois eles foram gerador automáticamente pela ferramenta de mock da API.

Já para acessar como avaliador, basta passar as seguintes credenciais: (login: avaliador), (senha: 123).

## Escopo futuro:

### Responsividade: 

Atualmente, o projeto não é responsivo para dispositivos móveis, algo que será resolvido através do uso de media queries e adaptações no CSS.

### Visual:

Essa é uma versão MVP da aplicação, a intenção é que a UI seja melhorada com o tempo.

## Importante

O formato e lógica utilizado no login e em outras partes da aplicação, onde damos um GET na lista toda para recuperar apenas 1 elemento, só é utilizado devido ao MOCK da API que não nos fornece uma rota de verificação ou de login específica. Em projetos profissionais, essa abordagem jamais seria utilizada.