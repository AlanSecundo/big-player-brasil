import React from 'react';
import './LoginPage.css';
import { Form, Input, Button, Modal } from 'antd';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { SUBSCRIPTION_ROUTE } from '../routes';

const LoginPage = () => {

    const history = useHistory();

    const onFinish = values => {

        const { username, password } = values;

        axios.get('/user')
            .then(response => {

                const { data } = response;

                const loginList = data.filter(user => {
                    return user.login === username && user.password === password
                });

                const userExists = loginList.length > 0;


                if (userExists) {
                    localStorage.setItem("id", loginList[0].id);
                    localStorage.setItem("role", loginList[0].type);
                    history.push(SUBSCRIPTION_ROUTE);
                } else {
                    Modal.info({
                        title: 'Usuário e senha não encontrados!',
                        content: (
                            <p>Credenciais inválidas, tente novamente com novas credenciais.</p>
                        ),
                        onOk() { },
                    });
                }
            })
    };


    return (
        <>
            <h2>Acesse</h2>
            <Form
                name="basic"
                onFinish={onFinish}
                className="login__form"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Por favor, insira seu usuário' }]}
                >
                    <Input placeholder="Usuário" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor, insira sua senha' }]}
                >
                    <Input.Password placeholder="Senha" />
                </Form.Item>

                <Form.Item>
                    <Button className="login__button" type="primary" htmlType="submit">
                        Entrar
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default LoginPage;