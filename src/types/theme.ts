export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export interface ThemeColors {
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  error: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  warning: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  info: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  success: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
  };
  divider: string;
  action: {
    active: string;
    hover: string;
    selected: string;
    disabled: string;
    disabledBackground: string;
    focus: string;
  };
}

export interface ThemeTypography {
  fontFamily: string;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  h2: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  h3: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  h4: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  h5: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  h6: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  subtitle1: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  subtitle2: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  body1: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  body2: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  button: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    textTransform: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  };
  caption: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  overline: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
}

export interface ThemeSpacing {
  unit: number;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeShape {
  borderRadius: number;
}

export interface ThemeTransitions {
  duration: {
    shortest: number;
    shorter: number;
    short: number;
    standard: number;
    complex: number;
    enteringScreen: number;
    leavingScreen: number;
  };
  easing: {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    sharp: string;
  };
}

export interface ThemeZIndex {
  mobileStepper: number;
  fab: number;
  speedDial: number;
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  shape: ThemeShape;
  transitions: ThemeTransitions;
  zIndex: ThemeZIndex;
  components?: {
    MuiButton?: {
      styleOverrides?: {
        root?: {
          borderRadius?: number;
          textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
        };
      };
    };
    MuiCard?: {
      styleOverrides?: {
        root?: {
          borderRadius?: number;
          boxShadow?: string;
        };
      };
    };
    MuiPaper?: {
      styleOverrides?: {
        root?: {
          borderRadius?: number;
        };
      };
    };
  };
}

export interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
} 