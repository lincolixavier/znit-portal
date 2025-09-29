# Sistema de Persistência Temporária

> ⚠️ **TEMPORÁRIO**: Este sistema será removido quando a API real for integrada.

## Descrição

Sistema de persistência em memória (localStorage) para simular o fluxo completo de cadastro, login e edição de dados sem necessidade de backend.

## Arquivos Modificados

1. **`/src/lib/tempStorage.ts`** ✨ NOVO
   - Serviço para gerenciar dados no localStorage
   - Métodos: saveEnrollmentData, createAccount, validateLogin, getUserData, updateUserData, etc.

2. **`/src/app/[locale]/enrollment/components/AdesaoForm.tsx`**
   - Salva dados a cada step no localStorage
   - Carrega dados salvos ao reabrir

3. **`/src/app/[locale]/enrollment/components/steps/StepSecurity.tsx`**
   - Adiciona campos de senha e confirmação de senha
   - Cria conta no localStorage ao finalizar

4. **`/src/app/[locale]/auth/login/page.tsx`**
   - Valida login contra dados salvos no localStorage
   - Cria sessão do usuário

5. **`/src/app/[locale]/dashboard/page.tsx`**
   - Exibe nome do usuário logado

6. **`/src/app/[locale]/dashboard/components/Header.tsx`**
   - Exibe nome do usuário no header
   - Logout limpa sessão do localStorage

7. **`/src/app/[locale]/dashboard/personal-info/components/PersonalInfoTab.tsx`**
   - Carrega dados do localStorage
   - Permite edição e salvamento

## Fluxo Completo

### 1. Cadastro (/enrollment/new)
1. Preencher dados pessoais (Step 1)
2. Preencher endereço (Step 2)
3. Preencher contribuição (Step 3)
4. Criar senha e código de segurança (Step 4)
   - Senha será salva junto com o CPF
5. Finalizar cadastro (Step 5)

### 2. Login (/auth/login)
1. Inserir CPF (usado no cadastro)
2. Inserir senha (criada no Step 4)
3. Sistema valida contra localStorage
4. Cria sessão e redireciona para dashboard

### 3. Dashboard (/dashboard)
- Exibe nome do usuário no header e na saudação
- Nome vem do campo "Nome Completo" do Step 1

### 4. Editar Informações (/dashboard/personal-info)
- Carrega dados do Step 1 salvos
- Permite editar e salvar alterações
- Alterações refletem imediatamente no dashboard

## Comandos Úteis (Console do Browser)

```javascript
// Limpar todos os dados temporários
tempStorage.clear()

// Ver conta atual
tempStorage.getAccount()

// Ver dados do usuário
tempStorage.getUserData()

// Ver usuário logado
tempStorage.getCurrentUser()

// Fazer logout
tempStorage.logout()
```

## Estrutura de Dados

```typescript
{
  cpf: "123.456.789-00",
  password: "senha123",
  enrollmentData: {
    step1: {
      nomeCompleto: "João da Silva",
      cpf: "123.456.789-00",
      email: "joao@email.com",
      // ... outros campos
    },
    step2: { /* endereço */ },
    step3: { /* contribuição */ },
    step4: { /* segurança */ }
  }
}
```

## Testando o Fluxo

1. Acesse `/pt/enrollment/new`
2. Preencha os dados do formulário (já vem com dados mockados)
3. No Step 4, crie uma senha (ex: `senha123`)
4. Digite qualquer código de 6 dígitos
5. Finalize o cadastro
6. Faça logout ou vá para `/pt/auth/login`
7. Entre com o CPF e senha criados
8. Acesse o dashboard e veja seu nome
9. Vá em "Informações pessoais" e edite os dados
10. Volte ao dashboard e veja as alterações

## Removendo o Sistema Temporário

Quando a API estiver pronta, remover:

1. Arquivo `/src/lib/tempStorage.ts`
2. Todos os comentários marcados com `// TEMP:`
3. Imports do `tempStorage`
4. Chamar API real nos lugares onde está sendo usado o `tempStorage`
5. Este arquivo README

**Buscar por**: `tempStorage` ou `TEMP:` no projeto para encontrar todos os usos.
