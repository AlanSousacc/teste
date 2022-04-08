export interface Session {
    // eslint-disable-next-line camelcase
    id_usuario: number;
    // eslint-disable-next-line camelcase
    nome_pessoa: string;
    email: string;
    ramal: string;
    // eslint-disable-next-line camelcase
    id_setor: number;
    // eslint-disable-next-line camelcase
    nome_setor: string;
    nivel: number;
    grupos: Array<number>;
    imagem: string;
}
