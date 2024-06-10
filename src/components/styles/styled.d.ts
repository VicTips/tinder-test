import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgDark: string;
      bgLight: string;
      bgInput: string;
      bgMenuBtn: string;
      bgNavBar: string;
      bgLikeCard: string;
      textPrimary: string;
      textSecondary: string;
      textSecondary80: string;
      togglebtn: string;
      icon: string;
      dislikeIcon: string;
      label: string;
      border: string;
      cardLikeIcon: string;
      cardDislikeIcon: string;
    };
  }
}
