
/* eslint-disable camelcase */


export interface CompetenciasDcft {
    id_empresa_competencia: any,
    competencia: any,
    id_usuario_responsavel: any,
    status: any,
    email_finalizado_enviado: any,
    status_desc: any,
    data_criacao: any,
    data_limite_execucao: any,
    data_limite_transmissao: any,
    responsavel: any,
    percTotalFiscal: any,
    percTotalFiscalRet: any,
    percEsocial: any,
    percEsocialRet: any,
    percEsocialDes: any,
    percConferencia: any,
    percTotalDeclaracoes: any,
    percDarf: any
}

export interface PaginatorDcftCompetencias {
    current_page: number;
    data: CompetenciasDcft[];
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: [],
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: null,
    to: number,
    total: number
}

export interface Paginator {
    current_page: number;
    data: any[];
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: [],
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: null,
    to: number,
    total: number
}

export interface DctfCompetencias {
    data: PaginatorDcftCompetencias[],
}

export interface DataCompetencias {
    data: DctfCompetencias[]
}
