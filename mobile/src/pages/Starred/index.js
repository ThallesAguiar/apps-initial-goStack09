import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

class Starred extends Component {
  /**Nesta função, estou atribuindo o nome do usuario para ser o titulo no cabeçario. */
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('nameRepo'),
  });

  // props
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  // lifecicle hook
  componentDidMount() {
    const { navigation } = this.props;

    const url = navigation.getParam('url');

    this.setState({ url: url })
  };

  // data:()=>({})
  state = {
    url: ''
  }

  render() {
    const { url } = this.state;

    return <WebView style={{ flex: 1 }} source={{ uri: url }} />;

  }
}

export default Starred;