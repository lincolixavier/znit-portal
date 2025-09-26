export const dashboard = {
  title: 'Dashboard',
  greeting: '¡Hola, {name}! Es bueno verte aquí.',
  lastUpdate: 'Última actualización: {date}',
  paymentMethod: {
    title: 'Registra tu método de pago',
    description: 'Para comenzar a invertir en tu futuro, es necesario informar el método de pago. Sin este registro, tus contribuciones no podrán ser procesadas.',
    button: 'Agregar método de pago',
    progress: '{percentage}% completado',
  },
  extraContribution: {
    title: 'Haz una contribución extra y fortalece tu futuro financiero.',
    button: 'Contribuir ahora',
  },
  stats: {
    totalBalance: 'Saldo total acumulado',
    accumulatedReturn: 'Rendimiento acumulado',
  },
  movements: {
    title: 'Últimos movimientos',
    viewAll: 'Ver todo',
    contribution: 'Contribución',
    extraContribution: 'Contribución extra',
    monthlyReturn: 'Rendimiento mensual',
    date: '{day} de {month} de {year}',
  },
  navigation: {
    home: 'Inicio',
    statement: 'Extracto',
    personalInfo: 'Información personal',
    documents: 'Documentos',
  },
  header: {
    menuToggle: 'Abrir/cerrar menú',
    user: 'Usuario',
  },
} as const;
