# language: pt
Funcionalidade: Progress Bar

  Cenario: Parar abaixo de 25 porcento e resetar ao chegar em 100 porcento
    Dado que eu acesso a pagina Progress Bar
    Quando eu inicio a progress bar
    E paro a progress bar antes de 25 porcento
    Entao o valor da progress bar deve ser menor ou igual a 25 porcento
    Quando eu inicio novamente e aguardo chegar a 100 porcento
    Entao devo resetar a progress bar
