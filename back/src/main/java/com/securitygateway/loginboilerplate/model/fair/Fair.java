package com.securitygateway.loginboilerplate.model.fair;

import com.securitygateway.loginboilerplate.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "fairs")
public class Fair {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "fair_seq")
    @SequenceGenerator(name = "fair_seq", sequenceName = "fair_sequence", allocationSize = 1)
    private Long id;

    private String name;
    private Double latitude;
    private Double longitude;
    private String address;
    private String description;
    private String schedule;
    private String socialMedia;
    private String attractions;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
