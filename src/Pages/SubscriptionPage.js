import React, { useCallback, useEffect, useState } from 'react';
import './SubscriptionPage.css';
import { Form, Input, Button, Spin } from 'antd';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { LIST_SUBSCRIPTIONS_ROUTE } from '../routes/index';

const SubscriptionPage = () => {

    const [loading, setLoading] = useState(false);
    const [subscriptionSuccessfull, setSubscriptionSuccessfull] = useState(false);

    const history = useHistory();

    const candidate_id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    const goToSubscriptionListPage = useCallback(() => {
        history.push(LIST_SUBSCRIPTIONS_ROUTE)
    }, [history])

    useEffect(() => {

        if (role === 'EVALUATOR') {
            goToSubscriptionListPage();
        }

        setLoading(true);

        axios.get('/subscription')
            .then(response => {

                const { data } = response;

                const userHasSubscription = data.filter(subscription => {
                    return subscription.candidate_id === candidate_id
                }).length > 0;

                setLoading(false);

                if (userHasSubscription) {
                    history.push(LIST_SUBSCRIPTIONS_ROUTE)
                }

            })

    }, [candidate_id, history, role, goToSubscriptionListPage])

    const onFinish = values => {

        const body = {
            ...values,
            candidate_id,
            status: 'TO_AVALIATION'
        }

        setLoading(true);

        axios.post('/subscription', body)
            .then(response => {
                setSubscriptionSuccessfull(true);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    const renderSucessfullMessage = () => (
        <div className="subscription__successful">
            <img
                src={require('../assets/checked.png').default}
                alt="Ícone de sucesso verde com um símbolo de check em branco logo ao centro."
                width="60px"
            />
            <h1>Inscrição realizada com sucesso!</h1>
            <p>Para ficar de olho na sua aprovação, basta consultar a tela de listagem!</p>
            <Button className="subscription__button" type="primary" onClick={goToSubscriptionListPage}>
                Acessar tela de listagem
            </Button>
        </div>
    )

    const renderForm = () => (
        <>
            <h2>Preencha as informações abaixo</h2>
            <Form
                name="basic"
                onFinish={onFinish}
                className="subscription__form"
            >
                <div className="subscription__row">
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Por favor, digite seu nome' }]}
                    >
                        <Input placeholder="Nome" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Por favor, digite seu email' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                </div>
                <div className="subscription__row">
                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: 'Por favor, digite seu telefone' }]}
                    >
                        <Input placeholder="Telefone" />
                    </Form.Item>

                    <Form.Item
                        name="national_registration"
                        rules={[{ required: true, message: 'Por favor, digite seu CPF' }]}
                    >
                        <Input placeholder="CPF" />
                    </Form.Item>
                </div>
                <Form.Item
                    name="video_url"
                    rules={[{ required: true, message: 'Por favor, cole a URL do seu vídeo' }]}
                >
                    <Input placeholder="URL do seu vídeo" />
                </Form.Item>

                <Form.Item>
                    <Button className="subscription__button" type="primary" htmlType="submit">
                        Submeter inscrição
                    </Button>
                </Form.Item>

            </Form>
        </>
    )

    const mountScreen = () => {
        if (loading) return <Spin size="large" />;

        if (subscriptionSuccessfull) return renderSucessfullMessage();

        return renderForm();
    }

    return (
        <>
            {mountScreen()}
        </>
    )
}

export default SubscriptionPage;