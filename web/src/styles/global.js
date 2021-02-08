import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        min-height: 100%;
    }

    body {
        background: #7159c1;
        -webkit-font-smoothing: antialiased !important;
    }

    border-style, -moz-user-input, button {
        color: #222;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
    }

    button {
        cursor: pointer;
    }
`