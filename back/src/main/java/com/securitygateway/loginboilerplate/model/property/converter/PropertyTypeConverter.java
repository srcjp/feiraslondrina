package com.securitygateway.loginboilerplate.model.property.converter;

import com.securitygateway.loginboilerplate.model.property.enums.PropertyType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PropertyTypeConverter implements AttributeConverter<PropertyType, String> {
    @Override
    public String convertToDatabaseColumn(PropertyType attribute) {
        if(attribute == null) return null;
        return attribute.name();
    }

    @Override
    public PropertyType convertToEntityAttribute(String dbData) {
        if(dbData == null) return null;
        try {
            return PropertyType.valueOf(dbData.toUpperCase());
        } catch (IllegalArgumentException ex) {
            // Attempt to match ignoring accents or spaces
            return PropertyType.valueOf(dbData.trim().toUpperCase());
        }
    }
}
