import styled, { keyframes, css } from 'styled-components';
// keyframes é o mesmo que o do css, para animações

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid #eee;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
    }
`;



const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;


// attrs é atributos que algum componente tem, por exemplo, este botão ele é um submit.
//e posso usar props, para pegar algum valor do componente de algum lugar. 
//EX.: o loadind no component Main esta false, mas quando ele estiver true, mudará o estilo. 
export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading,
}))`
    background: #7159c1;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    /* &  o E comecial, ele quer dizer que o que vou editar é o proprio botão "SubmitButton" porem serão os efeitos de estado.
    EX.: &:focus {} é quando o botão receber foco, ele mudará os estilos. */
    &[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
    }

    ${props =>
        props.loading && css`
            svg {
            animation: ${rotate} 2s linear infinite;
            }
        `}
`;


export const List = styled.ul`
    list-style: none;
    margin-top: 30px;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        /* aplica estilo em todos, menos no primeiro. Segundo em diante. */
        & + li {
            border-top: 1px solid #eee;
        }

        a {
            color: #7156c1;
            text-decoration: none;
        }
    }
`;