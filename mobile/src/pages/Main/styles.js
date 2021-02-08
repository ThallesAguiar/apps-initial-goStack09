import styled from 'styled-components/native';

// esse component, ele se adapta para as plataformas IOS e Android. 
import { RectButton } from 'react-native-gesture-handler';

// Este container, é um padrão que o Diego Fernandes usa para suas aplicações. Posso adotar ou não, se quiser.
export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;


export const Form = styled.View`
    flex-direction: row;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-color: #eee;
`;

// attrs:  da acesso aos atributos de algum component
export const Input = styled.TextInput.attrs({
    // editar como JS e não CSS
    placeholderTextColor: '#999'
})`
    flex:1;
    height: 40px;
    background: #eee;
    border-radius:4px;
    padding: 0 15px;
    border: 1px solid #eee;
`;

/* Não tem este component RectButton dentro do styled, mas isso não impede de colocar ele dentro->  styled(RectButton)
 Posso fazer isso com outros components*/
export const SubmitButton = styled(RectButton)`
    justify-content: center;
    align-items: center;
    background: black;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 12px;
    opacity: ${props => props.loading ? 0.7 : 1};
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false, //tira a barra de rolagem da tela. 
})`
    margin-top: 20px;
`;

export const User = styled.View`
    align-items: center;
    margin: 0 20px 30px;
`;

export const Avatar = styled.Image`
    width: 64px;
    height: 64px;
    border-radius: 32px;
    background: #eee;
`;

export const Name = styled.Text`
    font-size: 14px;
    color: #333;
    font-weight: bold;
    margin-top: 5px;
    text-align: center;
`;

export const Bio = styled.Text.attrs({
    numberOfLines: 2, //este atributo é do TEXT, e ele deixa o texto com quantas linhas a gente quiser, que neste exemplo ele vai ficar com 2 linhas.
})`
    font-size: 13px;
    line-height: 18px;
    color: #999;
    margin-top: 5px;
    text-align: center;
`;

export const ProfileButton = styled(RectButton)`
    margin-top: 10px;
    align-self: stretch; /**faz o component ter a largura total do flex.*/
    border-radius: 4px;
    background: black;
    justify-content: center;
    align-items: center;
    height: 36px;    
`;

export const ProfileButtonText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
`;