import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgDark: string;
      bgLight: string;
      bgInput: string;
      textPrimary: string;
      textSecondary: string;
      textSecondary80: string;
      icon: string;
      label: string;
      border: string;
    };
  }
}
