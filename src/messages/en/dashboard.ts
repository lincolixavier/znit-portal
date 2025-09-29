export const dashboard = {
  title: 'Dashboard',
  greeting: 'Hello, {name}! Good to see you here.',
  lastUpdate: 'Last update: {date}',
  paymentMethod: {
    title: 'Register your payment method',
    description: 'To start investing in your future, you need to inform your payment method. Without this registration, your contributions cannot be processed.',
    button: 'Add payment method',
    progress: '{percentage}% completed',
  },
  extraContribution: {
    title: 'Make an extra contribution and strengthen your financial future.',
    button: 'Contribute now',
  },
  stats: {
    totalBalance: 'Total accumulated balance',
    accumulatedReturn: 'Accumulated return',
  },
  movements: {
    title: 'Latest movements',
    viewAll: 'View all',
    contribution: 'Contribution',
    extraContribution: 'Extra contribution',
    monthlyReturn: 'Monthly return',
    date: '{day} {month} {year}',
  },
  navigation: {
    home: 'Home',
    statement: 'Statement',
    personalInfo: 'Personal information',
    documents: 'Documents',
  },
  header: {
    menuToggle: 'Open/close menu',
    user: 'User',
    logout: 'Logout',
    profile: 'Profile',
  },
} as const;
