export type Ocorrencia = {
    "id": number,
    "descricao": string,
}

export type InformacaoDesaparecido = {
    "ocoId": number,
    "informacao": string,
    "data": string, // yyyy-MM-dd
    "id": number,
    "anexos": string[]
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