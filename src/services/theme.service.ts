type Theme = 'light' | 'dark' | 'system';

class ThemeService {
  private static instance: ThemeService;
  private currentTheme: Theme = 'system';
  private listeners: ((theme: Theme) => void)[] = [];

  private constructor() {
    this.initializeTheme();
  }

  public static getInstance(): ThemeService {
    if (!ThemeService.instance) {
      ThemeService.instance = new ThemeService();
    }
    return ThemeService.instance;
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('system');
    }
  }

  public setTheme(theme: Theme) {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }

    this.notifyListeners();
  }

  public getTheme(): Theme {
    return this.currentTheme;
  }

  public subscribe(listener: (theme: Theme) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentTheme));
  }
}

export const themeService = ThemeService.getInstance(); 