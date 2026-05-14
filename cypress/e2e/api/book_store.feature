# language: pt
Funcionalidade: Reserva de livros pela API DemoQA

  Cenario: Criar usuario, autorizar e reservar dois livros
    Dado que eu crio um usuario valido na API
    Quando eu gero um token de acesso para o usuario
    Entao o usuario deve estar autorizado
    Quando eu consulto a lista de livros disponiveis
    E eu reservo dois livros de livre escolha
    Entao os detalhes do usuario devem exibir os dois livros reservados
