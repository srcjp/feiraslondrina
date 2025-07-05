package com.securitygateway.loginboilerplate.model.fair;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "attractions")
public class Attraction {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "attraction_seq")
    @SequenceGenerator(name = "attraction_seq", sequenceName = "attraction_sequence", allocationSize = 1)
    private Long id;

    private String name;
    private String specialty;
    private String socialMedia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fair_id")
    @JsonIgnore
    private Fair fair;
}
