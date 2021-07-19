import { Button, Card } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getStatusName } from '../helpers/subscripton';
import { LOGIN_ROUTE } from '../routes';
import './SubscriptionListPage.css';

const SubscriptionListPage = () => {

    const [subscriptionList, setSubscriptionList] = useState([]);

    const userRole = localStorage.getItem("role");

    const history = useHistory();

    useEffect(() => {
        axios.get('/subscription')
            .then(response => {
                setSubscriptionList(response.data);
            })
    }, [])

    const logoutUser = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("id");
        history.push(LOGIN_ROUTE);
    }

    const answerSubmition = (subscriptionIndex, answer) => {

        const subscription = subscriptionList[subscriptionIndex];

        axios.put(`/subscription/${subscription.id}`, {
            ...subscription,
            status: answer
        }).then(response => {

            const { data } = response;

            const arrayUpdated = [...subscriptionList];

            arrayUpdated[subscriptionIndex] = data;

            setSubscriptionList(arrayUpdated);

            console.log(arrayUpdated);
        })
    }

    return (
        <>
            <h2>Listagem de candidatos</h2>
            <Button className="exit_button" onClick={logoutUser}>
                Sair
            </Button>
            <div className="list__container">
                {
                    subscriptionList.map((subscription, index) => (
                        <Card
                            key={`${subscription.status}-${subscription.id}`}
                            title={`Candidato: ${subscription.name}`}
                            className={`list__card status__${subscription.status}`}>
                            <span><b>CPF:</b> {subscription.national_registration}</span>
                            <br />
                            <span><b>Telefone:</b> {subscription.phone}</span>
                            <br />
                            <span>
                                <b>Vídeo: </b>
                                <a href={subscription.video_url} target="_blank" rel="noreferrer">
                                    Assista clicando aqui
                                </a>
                            </span>
                            <br />
                            <span><b>Status:</b> {getStatusName(subscription.status)}</span>
                            {
                                userRole === 'EVALUATOR' && subscription.status === 'TO_AVALIATION' &&
                                <div className="list__row">
                                    <Button className="reprove__button" onClick={() => answerSubmition(index, 'REFUSED')}>
                                        Reprovar
                                    </Button>
                                    <Button className="aprove__button" onClick={() => answerSubmition(index, 'APROVED')}>
                                        Aprovar
                                    </Button>
                                </div>
                            }
                        </Card>
                    ))
                }
            </div>
        </>
    )
}

export default SubscriptionListPage;