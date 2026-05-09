function FormatProcurements(licitacao) {
    return `${licitacao.tipo} nº ${licitacao.numero}/${licitacao.ano}`;
}

export default FormatProcurements;