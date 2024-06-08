import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: "DM Sans", sans-serif;
        background-color: ${(props) => props.theme.colors.bgDark};
        height: 100%;
        min-height: 100vh;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    * {
        box-sizing: border-box;
    }
    .root {
        width:100%;
        flex: 1
    }
    .main-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
`;
