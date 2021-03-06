import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
    // Data {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
    };
    // }

    // carrega os dados do localStorage. Este metodo é como se fosse o amount()  do vuejs
    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }

    // Salva os dados do localStorage
    // componentDidUpdate(valorVelho, valorNovo){}
    componentDidUpdate(_, prevState) {
        const { repositories }= this.state;

        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }


    // Methods {
    handleInputChange = event => {
        this.setState({ newRepo: event.target.value });
    };

    handleSubmit = async event => {
        event.preventDefault(); //FAZ EVITAR O REFRESH NA PÁGINA

        this.setState({ loading: true });

        const { newRepo, repositories } = this.state;

        const response = await api.get(`/repos/${newRepo}`);

        const data = {
            name: response.data.full_name
        };

        this.setState({
            repositories: [...repositories, data],
            newRepo: '',
            loading: false,
        })
    }

    // }

    render() {

        const { newRepo, loading, repositories } = this.state;



        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton loading={loading}>
                        {loading ?
                            <FaSpinner color="#FFF" size={14} />
                            :
                            <FaPlus color="#FFF" size={14} />
                        }
                    </SubmitButton>
                </Form>

                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            {/* eslint-disable-next-line */}
                            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}