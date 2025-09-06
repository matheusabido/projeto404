export type Ocorrencia = {
    "id": number,
    "descricao": string,
}

export type Informacao = {
    ocoId: number
    informacao: string
    data: string // yyyy-MM-dd
    anexos: string[] | null
}

export type InformacaoDesaparecido = {
    "ocoId": number,
    "informacao": string,
    "data": string, // yyyy-MM-dd
    "id": number,
    "anexos": string[]  | null
}

export type DetalheOcorrencia = {
    "dtDesaparecimento": string, // ISO
    "dataLocalizacao": string, // yyyy-MM-dd
    "encontradoVivo": boolean,
    "localDesaparecimentoConcat": string,
    "ocorrenciaEntrevDesapDTO": {
        "informacao": string,
        "vestimentasDesaparecido": string
    },
    "listaCartaz": {
        "urlCartaz": string,
        "tipoCartaz": "PDF_DESAPARECIDO"
    }[],
    "ocoId": number,
}

export type Pessoa = {
    "id": number,
    "nome": string,
    "idade": number,
    "sexo": "MASCULINO" | "FEMININO",
    "vivo": boolean,
    "urlFoto": string,
    "ultimaOcorrencia": DetalheOcorrencia,
}

export type Paginate<T> = {
    content: T[],
    empty: boolean,
    first: boolean,
    last: boolean,
    number: number,
    numberOfElements: number,
    pageable: {
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean,
        },
        offset: number,
        pageNumber: number,
        pageSize: number,
        paged: boolean,
        unpaged: boolean,
    },
    size: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean,
    },
    totalElements: number,
    totalPages: number,
}

export type Statistics = {
    quantPessoasDesaparecidas: number,
    quantPessoasEncontradas: number
}