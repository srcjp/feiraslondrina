package com.securitygateway.loginboilerplate.model.property.enums;

public enum PropertySubType {
    COBERTURA(PropertyType.APARTAMENTO),
    PADRAO_AP(PropertyType.APARTAMENTO),
    SOBRELOJA_AP(PropertyType.APARTAMENTO),

    CASA_DE_FUNDOS(PropertyType.CASA),
    CHACARA_CASA(PropertyType.CASA),
    COMERCIAL_CASA(PropertyType.CASA),
    CONDOMINIO(PropertyType.CASA),
    CASA_PADRAO(PropertyType.CASA),

    BARRACAO(PropertyType.COMERCIAL),
    CONJUNTO_COMERCIAL(PropertyType.COMERCIAL),
    EMPREENDIMENTO(PropertyType.COMERCIAL),
    GALPAO(PropertyType.COMERCIAL),
    IMOVEL_COMERCIAL(PropertyType.COMERCIAL),
    LOJA(PropertyType.COMERCIAL),
    PONTO(PropertyType.COMERCIAL),
    SALA(PropertyType.COMERCIAL),
    SALA_COMERCIAL_EDIFICIO(PropertyType.COMERCIAL),
    SOBRELOJA_COM(PropertyType.COMERCIAL),

    CHACARA_RURAL(PropertyType.RURAL),

    TERRENO_COMERCIAL(PropertyType.TERRENO),
    TERRENO_PADRAO(PropertyType.TERRENO);

    private final PropertyType type;

    PropertySubType(PropertyType type){
        this.type = type;
    }

    public PropertyType getType(){
        return type;
    }
}
