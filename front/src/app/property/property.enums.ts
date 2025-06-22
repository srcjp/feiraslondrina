export enum Finalidade {
  RESIDENCIAL = 'RESIDENCIAL',
  COMERCIAL = 'COMERCIAL',
  MISTO = 'MISTO'
}

export enum PropertyType {
  APARTAMENTO = 'APARTAMENTO',
  CASA = 'CASA',
  COMERCIAL = 'COMERCIAL',
  RURAL = 'RURAL',
  TERRENO = 'TERRENO'
}

export enum PropertySubtype {
  COBERTURA = 'COBERTURA',
  PADRAO_AP = 'PADRAO_AP',
  SOBRELOJA_AP = 'SOBRELOJA_AP',
  CASA_DE_FUNDOS = 'CASA_DE_FUNDOS',
  CHACARA_CASA = 'CHACARA_CASA',
  COMERCIAL_CASA = 'COMERCIAL_CASA',
  CONDOMINIO = 'CONDOMINIO',
  CASA_PADRAO = 'CASA_PADRAO',
  BARRACAO = 'BARRACAO',
  CONJUNTO_COMERCIAL = 'CONJUNTO_COMERCIAL',
  EMPREENDIMENTO = 'EMPREENDIMENTO',
  GALPAO = 'GALPAO',
  IMOVEL_COMERCIAL = 'IMOVEL_COMERCIAL',
  LOJA = 'LOJA',
  PONTO = 'PONTO',
  SALA = 'SALA',
  SALA_COMERCIAL_EDIFICIO = 'SALA_COMERCIAL_EDIFICIO',
  SOBRELOJA_COM = 'SOBRELOJA_COM',
  CHACARA_RURAL = 'CHACARA_RURAL',
  TERRENO_COMERCIAL = 'TERRENO_COMERCIAL',
  TERRENO_PADRAO = 'TERRENO_PADRAO'
}

export enum PropertyItemEnum {
  AREA_DE_SERVICO = 'AREA_DE_SERVICO',
  ARMARIOS = 'ARMARIOS',
  BANHEIRO_DE_SERVICO = 'BANHEIRO_DE_SERVICO',
  BANHEIRO_SOCIAL = 'BANHEIRO_SOCIAL',
  BAR = 'BAR',
  CHURRASQUEIRA = 'CHURRASQUEIRA',
  COZINHA_PLANEJADA = 'COZINHA_PLANEJADA',
  DEPENDENCIA_DE_SERVICOS = 'DEPENDENCIA_DE_SERVICOS',
  DESPENSA = 'DESPENSA',
  DORMITORIOS_COM_ARMARIOS = 'DORMITORIOS_COM_ARMARIOS',
  LAVABO = 'LAVABO',
  SACADA = 'SACADA',
  SALA_DE_TV = 'SALA_DE_TV',
  VISTA_PANORAMICA = 'VISTA_PANORAMICA',
  HIDROMASSAGEM = 'HIDROMASSAGEM',
  AR_CONDICIONADO = 'AR_CONDICIONADO',
  LAREIRA = 'LAREIRA',
  ARMARIOS_PLANEJADOS = 'ARMARIOS_PLANEJADOS',
  BOX_EM_VIDRO = 'BOX_EM_VIDRO',
  HALL_DE_ENTRADA = 'HALL_DE_ENTRADA',
  SACADA_COM_CHURRASQUEIRA = 'SACADA_COM_CHURRASQUEIRA',
  SALA_DE_ESTAR = 'SALA_DE_ESTAR',
  SUITE_MASTER = 'SUITE_MASTER',
  VARANDA = 'VARANDA'
}

export enum BuildingItemEnum {
  ELEVADOR = 'ELEVADOR',
  ACADEMIA = 'ACADEMIA',
  PISCINA = 'PISCINA',
  AREA_GOURMET = 'AREA_GOURMET',
  SALAO_DE_FESTAS = 'SALAO_DE_FESTAS',
  PORTARIA_24H = 'PORTARIA_24H',
  ESPACO_KIDS = 'ESPACO_KIDS',
  FITNESS = 'FITNESS',
  PLAYGROUND = 'PLAYGROUND',
  QUADRA_POLIESPORTIVA = 'QUADRA_POLIESPORTIVA',
  SALAO_DE_JOGOS = 'SALAO_DE_JOGOS',
  INTERFONE = 'INTERFONE',
  PORTARIA = 'PORTARIA',
  LAVANDERIA = 'LAVANDERIA',
  ELEVADOR_SOCIAL = 'ELEVADOR_SOCIAL',
  AQUECEDOR_A_GAS_CENTRAL = 'AQUECEDOR_A_GAS_CENTRAL'
}

export const PropertySubtypeLabels: Record<PropertySubtype, string> = {
  [PropertySubtype.COBERTURA]: 'Cobertura',
  [PropertySubtype.PADRAO_AP]: 'Padrão',
  [PropertySubtype.SOBRELOJA_AP]: 'Sobreloja',
  [PropertySubtype.CASA_DE_FUNDOS]: 'Casa de fundos',
  [PropertySubtype.CHACARA_CASA]: 'Chácara',
  [PropertySubtype.COMERCIAL_CASA]: 'Casa comercial',
  [PropertySubtype.CONDOMINIO]: 'Condomínio',
  [PropertySubtype.CASA_PADRAO]: 'Casa padrão',
  [PropertySubtype.BARRACAO]: 'Barracão',
  [PropertySubtype.CONJUNTO_COMERCIAL]: 'Conjunto comercial',
  [PropertySubtype.EMPREENDIMENTO]: 'Empreendimento',
  [PropertySubtype.GALPAO]: 'Galpão',
  [PropertySubtype.IMOVEL_COMERCIAL]: 'Imóvel comercial',
  [PropertySubtype.LOJA]: 'Loja',
  [PropertySubtype.PONTO]: 'Ponto',
  [PropertySubtype.SALA]: 'Sala',
  [PropertySubtype.SALA_COMERCIAL_EDIFICIO]: 'Sala comercial em edifício',
  [PropertySubtype.SOBRELOJA_COM]: 'Sobreloja',
  [PropertySubtype.CHACARA_RURAL]: 'Chácara',
  [PropertySubtype.TERRENO_COMERCIAL]: 'Terreno comercial',
  [PropertySubtype.TERRENO_PADRAO]: 'Terreno'
};

export const PropertyItemLabels: Record<PropertyItemEnum, string> = {
  [PropertyItemEnum.AREA_DE_SERVICO]: 'Área de serviço',
  [PropertyItemEnum.ARMARIOS]: 'Armários',
  [PropertyItemEnum.BANHEIRO_DE_SERVICO]: 'Banheiro de serviço',
  [PropertyItemEnum.BANHEIRO_SOCIAL]: 'Banheiro social',
  [PropertyItemEnum.BAR]: 'Bar',
  [PropertyItemEnum.CHURRASQUEIRA]: 'Churrasqueira',
  [PropertyItemEnum.COZINHA_PLANEJADA]: 'Cozinha planejada',
  [PropertyItemEnum.DEPENDENCIA_DE_SERVICOS]: 'Dependência de serviços',
  [PropertyItemEnum.DESPENSA]: 'Despensa',
  [PropertyItemEnum.DORMITORIOS_COM_ARMARIOS]: 'Dormitórios com armários',
  [PropertyItemEnum.LAVABO]: 'Lavabo',
  [PropertyItemEnum.SACADA]: 'Sacada',
  [PropertyItemEnum.SALA_DE_TV]: 'Sala de TV',
  [PropertyItemEnum.VISTA_PANORAMICA]: 'Vista panorâmica',
  [PropertyItemEnum.HIDROMASSAGEM]: 'Hidromassagem',
  [PropertyItemEnum.AR_CONDICIONADO]: 'Ar condicionado',
  [PropertyItemEnum.LAREIRA]: 'Lareira',
  [PropertyItemEnum.ARMARIOS_PLANEJADOS]: 'Armários planejados',
  [PropertyItemEnum.BOX_EM_VIDRO]: 'Box em vidro',
  [PropertyItemEnum.HALL_DE_ENTRADA]: 'Hall de entrada',
  [PropertyItemEnum.SACADA_COM_CHURRASQUEIRA]: 'Sacada com churrasqueira',
  [PropertyItemEnum.SALA_DE_ESTAR]: 'Sala de estar',
  [PropertyItemEnum.SUITE_MASTER]: 'Suíte master',
  [PropertyItemEnum.VARANDA]: 'Varanda'
};

export const BuildingItemLabels: Record<BuildingItemEnum, string> = {
  [BuildingItemEnum.ELEVADOR]: 'Elevador',
  [BuildingItemEnum.ACADEMIA]: 'Academia',
  [BuildingItemEnum.PISCINA]: 'Piscina',
  [BuildingItemEnum.AREA_GOURMET]: 'Área gourmet',
  [BuildingItemEnum.SALAO_DE_FESTAS]: 'Salão de festas',
  [BuildingItemEnum.PORTARIA_24H]: 'Portaria 24h',
  [BuildingItemEnum.ESPACO_KIDS]: 'Espaço kids',
  [BuildingItemEnum.FITNESS]: 'Fitness',
  [BuildingItemEnum.PLAYGROUND]: 'Playground',
  [BuildingItemEnum.QUADRA_POLIESPORTIVA]: 'Quadra poliesportiva',
  [BuildingItemEnum.SALAO_DE_JOGOS]: 'Salão de jogos',
  [BuildingItemEnum.INTERFONE]: 'Interfone',
  [BuildingItemEnum.PORTARIA]: 'Portaria',
  [BuildingItemEnum.LAVANDERIA]: 'Lavanderia',
  [BuildingItemEnum.ELEVADOR_SOCIAL]: 'Elevador social',
  [BuildingItemEnum.AQUECEDOR_A_GAS_CENTRAL]: 'Aquecedor a gás central'
};

export const PropertySubtypesByType: Record<PropertyType, PropertySubtype[]> = {
  [PropertyType.APARTAMENTO]: [
    PropertySubtype.COBERTURA,
    PropertySubtype.PADRAO_AP,
    PropertySubtype.SOBRELOJA_AP
  ],
  [PropertyType.CASA]: [
    PropertySubtype.CASA_DE_FUNDOS,
    PropertySubtype.CHACARA_CASA,
    PropertySubtype.COMERCIAL_CASA,
    PropertySubtype.CONDOMINIO,
    PropertySubtype.CASA_PADRAO
  ],
  [PropertyType.COMERCIAL]: [
    PropertySubtype.BARRACAO,
    PropertySubtype.CONJUNTO_COMERCIAL,
    PropertySubtype.EMPREENDIMENTO,
    PropertySubtype.GALPAO,
    PropertySubtype.IMOVEL_COMERCIAL,
    PropertySubtype.LOJA,
    PropertySubtype.PONTO,
    PropertySubtype.SALA,
    PropertySubtype.SALA_COMERCIAL_EDIFICIO,
    PropertySubtype.SOBRELOJA_COM
  ],
  [PropertyType.RURAL]: [PropertySubtype.CHACARA_RURAL],
  [PropertyType.TERRENO]: [
    PropertySubtype.TERRENO_COMERCIAL,
    PropertySubtype.TERRENO_PADRAO
  ]
};
