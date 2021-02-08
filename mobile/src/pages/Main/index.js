import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { Container, Form, Input, SubmitButton, List, User, Avatar, Name, Bio, ProfileButton, ProfileButtonText } from './styles';
import api from '../../services/api';

// Keyboard: Acesso ao teclado.
// ActivityIndicator: sinal de loading que ja vem por padrão estilizado pra ambas plataformas.
// AsyncStorage: Salva aluma dado no "bando de dados do celular". Ele é asyncrono, por isso precisa do AWAIT.

class Main extends Component {

    static navigationOptions = {
        title: 'Usuários Github',
    };

    // props
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,
    };

    // data:()=>({})
    state = {
        newUser: '',
        users: [],
        loading: false,
    }

    // cicle Hooks
    async componentDidMount() {
        const users = await AsyncStorage.getItem('users');

        if (users) {
            this.setState({ users: JSON.parse(users) });
        }
    };

    async componentDidUpdate(_, prevState) {
        // _ : vai as props anteriores da atualização
        // prevState: estado de antes ele receber atualização.

        const { users } = this.state;
        if (prevState.users !== users) {
            await AsyncStorage.setItem('users', JSON.stringify(users));
        }

    };

    // methods
    handleAddUser = async () => {

        const { users, newUser } = this.state;

        this.setState({ loading: true });

        const response = await api.get(`/users/${newUser}`);

        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url
        };

        this.setState({
            users: [...users, data],
            newUser: '',
            loading: false,
        });

        // Esta opção faz com que quando finalizar esta função, feche o teclado automaticamente.
        Keyboard.dismiss();
    }

    handleNavigate = (user) => {
        const { navigation } = this.props;

        navigation.navigate('User', { user });
    };

    render() {
        const { users, newUser, loading } = this.state;

        return (
            <Container>
                <Form>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Adicionar usuário"
                        value={newUser}
                        onChangeText={text => this.setState({ newUser: text })}
                        returnKeyType="send" // faz com que possa enviar algo através do "ENVIAR" do teclado
                        onSubmitEditing={this.handleAddUser} //o que ele vai chamar quando clicar no botão de "ENVIAR", chamar o metodo handleAddUser.
                    />
                    <SubmitButton loading={loading} onPress={this.handleAddUser}>
                        {loading ? <ActivityIndicator color="#fff" size={30} /> : <MaterialIcons name="add" size={30} color="#FFF" />}
                    </SubmitButton>
                </Form>

                <List //FlatList
                    data={users} //os dados para ser mostrados. Precisa ser um vetor.
                    keyExtractor={user => user.login} //é a mesma funcionalidade do KEY do vue, e react. Propriedade unica.
                    renderItem={({ item /**este item é o USER do key */ }) => ( //recebe uma função. Retorna um JSX
                        <User>
                            <Avatar source={{ uri: item.avatar }} />
                            <Name>{item.name}</Name>
                            <Bio>{item.bio}</Bio>

                            <ProfileButton
                                onPress={() => this.handleNavigate(item)}  ///**estou passando a função como referencia. Se não usar assim, ele vai chamar a função sozinho, pq ele tem os parentes */
                            >
                                <ProfileButtonText>Ver perfil</ProfileButtonText>
                            </ProfileButton>
                        </User>
                    )}
                />
            </Container>
        );
    }
}



/** Posso editar as configurações de paginas na própria pagina, ou em Routes.js como vi em outros cursos.
 Ah! tem que recarregar a aplicação no emulador ou celular para que as mudanças sejam vistas.*/
Main.navigationOptions = {
    title: 'Usuários'
}

export default Main;