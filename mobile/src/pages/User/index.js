import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import { Container, Header, Avatar, Name, Bio, Stars, Starred, OwnerAvatar, Info, Title, Author } from './styles';

export default class User extends Component {
  /**Nesta função, estou atribuindo o nome do usuario para ser o titulo no cabeçario. */
  static navigationOptions = ({ navigation }) => ({ //usar ({}) para ele retornar um objeto, e não colocar () ele vai achar que é o corpo da função..
    title: navigation.getParam('user').name,
  });

  // props
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  // data:()=>({})
  state = {
    stars: [],
  };

  // lifecicle hook
  async componentDidMount() {
    const { navigation } = this.props;

    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data });
  };

  // methods
  navigateToRepository = (repository) => {
    const { html_url, name } = repository;

    const { navigation } = this.props;

    navigation.navigate('Starred', { url: html_url, nameRepo: name });
  }

  render() {
    const { navigation } = this.props;

    const { stars } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred onPress={() => this.navigateToRepository(item)}>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>

            </Starred>
          )}
        />
      </Container>
    )
  }
}
