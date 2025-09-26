export const dashboard = {
  title: 'Dashboard',
  greeting: 'Olá, {name}! Bom te ver por aqui.',
  lastUpdate: 'Última atualização: {date}',
  paymentMethod: {
    title: 'Cadastre sua forma de pagamento',
    description: 'Para começar a investir no seu futuro, é necessário informar a forma de pagamento. Sem esse cadastro, suas contribuições não poderão ser processadas.',
    button: 'Adicionar forma de pagamento',
    progress: '{percentage}% concluído',
  },
  extraContribution: {
    title: 'Faça uma contribuição extra e fortaleça seu futuro financeiro.',
    button: 'Contribuir agora',
  },
  stats: {
    totalBalance: 'Saldo total acumulado',
    accumulatedReturn: 'Rendimento acumulado',
  },
  movements: {
    title: 'Últimas movimentações',
    viewAll: 'Ver tudo',
    contribution: 'Contribuição',
    extraContribution: 'Contribuição extra',
    monthlyReturn: 'Rendimento mensal',
    date: '{day} de {month} de {year}',
  },
  navigation: {
    home: 'Início',
    statement: 'Extrato',
    personalInfo: 'Informações pessoais',
    documents: 'Documentos',
  },
  header: {
    menuToggle: 'Abrir/fechar menu',
    user: 'Usuário',
  },
} as const;
