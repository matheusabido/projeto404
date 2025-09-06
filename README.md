# Projeto 404
Nome: Matheus de Paula Abido

E-mail: matheusdepaulaabido@gmail.com

Telefone: 65 99258-6487

## Buildar
Para builder o projeto, basta rodar

```sh
docker build -t projeto404 .
```
```sh
docker run -d --name projeto404 -p 8080:80 projeto404
```

Então, é só abrir o http://localhost:8080

Depois de testar, rode o comando

```
docker stop projeto404
```

Se quiser excluir a imagem,
```sh
docker rm projeto404
```

## Como testar
Por falta de tempo, não escrevi testes automatizados.

### Explorar conteúdo

Para ver as pessoas, existem 3 lugares:
* Carrosel
* Filtro
* Modo TV

O carrossel pega 12 registros da rota dinâmica e exibe, permitindo o usuário navegar usando os botões.

O filtro permite que o usuário busque por uma pessoa específica.

O Modo TV exibe as mesmas 12 pessoas num layout feito para TVs. Para melhor experiência, colocar em tela cheia e scrollar para baixo.

### Adicionando Informações

Para adicionar informações, basta clicar no "Detalhes" no card. Lá, serão exibidas as informações já existentes juntamente de um botão para adicionar novas informações.