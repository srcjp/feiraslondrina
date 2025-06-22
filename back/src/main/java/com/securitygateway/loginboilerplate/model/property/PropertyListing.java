package com.securitygateway.loginboilerplate.model.property;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.securitygateway.loginboilerplate.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;
import com.securitygateway.loginboilerplate.model.property.enums.Finalidade;
import com.securitygateway.loginboilerplate.model.property.enums.PropertyType;
import com.securitygateway.loginboilerplate.model.property.enums.PropertySubType;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "property_listings")
public class PropertyListing {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "property_listing_seq")
    @SequenceGenerator(name = "property_listing_seq", sequenceName = "property_listing_sequence", allocationSize = 1)
    private Long id;

    private String status; // RENT or SALE
    private String title;
    @NotBlank
    @Column(nullable = false)
    private String subtitle;
    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(nullable = false)
    private PropertyType propertyType;
    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(nullable = false)
    private PropertySubType propertySubtype;
    @Enumerated(EnumType.STRING)
    private Finalidade finalidade;
    @NotNull
    @Column(nullable = false)
    private Double price;
    private Double condoFee;
    private String reference;
    private String realtor;
    private Integer bedrooms;
    private Integer suites;
    private Integer bathrooms;
    private Integer garages;
    @NotNull
    @Column(nullable = false)
    private Double areaUtil;
    private Double areaTotal;
    @NotBlank
    @Column(nullable = false, length = 5000)
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "property_items", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "item", nullable = false)
    @Builder.Default
    @Size(min = 1)
    private List<String> propertyItems = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "building_items", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "item", nullable = false)
    @Builder.Default
    @Size(min = 1)
    private List<String> buildingItems = new ArrayList<>();

    @NotBlank
    @Column(nullable = false)
    private String neighborhood;
    @NotBlank
    @Column(nullable = false)
    private String street;
    private String neighborhoodDescription;

    private String observation;
    @NotBlank
    @Column(nullable = false)
    private String phone;
    private String name;
    private LocalDate date;
    private Double latitude;
    private Double longitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "property_images", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "image_path")
    @Builder.Default
    private List<String> images = new ArrayList<>();

    @Column(nullable = false, columnDefinition = "boolean default false")
    @Builder.Default
    private Boolean deleted = false;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
