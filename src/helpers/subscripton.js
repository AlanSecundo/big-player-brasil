
export const getStatusName = status => {
    switch (status) {
        case 'APROVED':
            return 'Aprovado';
        case 'REFUSED':
            return 'Não aprovado';
        default:
            return 'Em avaliação';
    }
}