import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: "DM Sans", sans-serif;
        /* height: 100%; */
        /* display: flex;
        justify-content: center;
        align-items: center; */
    }
    body {
        background-color: ${(props) => props.theme.colors.bgDark};
        transition: background-color 0.5s ease, color 0.5s ease;

    }
    a {
        color: inherit;
        text-decoration: none;
    }
    * {
        box-sizing: border-box;
    }
`;
