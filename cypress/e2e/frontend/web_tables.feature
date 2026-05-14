# language: pt
Funcionalidade: Web Tables

  Cenario: Criar, editar e deletar registro
    Dado que eu acesso a pagina Web Tables
    Quando eu crio um novo registro
    E edito o registro criado
    Entao o registro editado deve aparecer na tabela
    Quando eu deleto o registro criado
    Entao o registro nao deve mais aparecer na tabela

  Cenario: Criar e deletar doze registros dinamicos
    Dado que eu acesso a pagina Web Tables
    Quando eu crio 12 novos registros dinamicos
    Entao os 12 registros devem aparecer na tabela
    Quando eu deleto todos os registros dinamicos
    Entao nenhum registro dinamico deve aparecer na tabela
