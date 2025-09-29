// TEMPORÁRIO: Sistema de persistência em memória para desenvolvimento
// Este arquivo será removido quando a API real for integrada

interface UserAccount {
  cpf: string;
  password: string;
  enrollmentData: {
    step1?: Record<string, unknown>;
    step2?: Record<string, unknown>;
    step3?: Record<string, unknown>;
    step4?: Record<string, unknown>;
  };
}

const STORAGE_KEY = 'temp_user_account';
const CURRENT_USER_KEY = 'temp_current_user';

export const tempStorage = {
  // Salvar dados do enrollment
  saveEnrollmentData(data: UserAccount['enrollmentData']) {
    if (typeof window === 'undefined') return;
    
    const existing = this.getAccount();
    const updated = {
      ...existing,
      enrollmentData: {
        ...existing?.enrollmentData,
        ...data,
      },
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  // Criar conta com CPF e senha
  createAccount(cpf: string, password: string) {
    if (typeof window === 'undefined') return;
    
    const existing = this.getAccount();
    const account: UserAccount = {
      cpf,
      password,
      enrollmentData: existing?.enrollmentData || {},
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
  },

  // Obter conta
  getAccount(): UserAccount | null {
    if (typeof window === 'undefined') return null;
    
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Validar login
  validateLogin(cpf: string, password: string): boolean {
    const account = this.getAccount();
    if (!account) return false;
    
    return account.cpf === cpf && account.password === password;
  },

  // Salvar sessão do usuário atual
  setCurrentUser(cpf: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CURRENT_USER_KEY, cpf);
  },

  // Obter usuário atual
  getCurrentUser(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(CURRENT_USER_KEY);
  },

  // Logout
  logout() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Verificar se está logado
  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  },

  // Obter dados do usuário logado
  getUserData(): UserAccount['enrollmentData'] | null {
    const account = this.getAccount();
    return account?.enrollmentData || null;
  },

  // Atualizar dados do usuário
  updateUserData(updates: Partial<UserAccount['enrollmentData']>) {
    if (typeof window === 'undefined') return;
    
    const account = this.getAccount();
    if (!account) return;

    account.enrollmentData = {
      ...account.enrollmentData,
      ...updates,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
  },

  // Limpar tudo (útil para desenvolvimento)
  clear() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  },
};
