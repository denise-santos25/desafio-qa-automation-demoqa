# language: pt
Funcionalidade: Browser Windows

  Cenario: Abrir nova janela e validar a mensagem exibida
    Dado que eu acesso a pagina Browser Windows
    Quando eu clico no botao New Window
    Entao uma nova janela deve ser aberta com a mensagem "This is a sample page"
