package com.tetradev.yaquedo.iam.domain;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "workers")
@DiscriminatorValue("WORKER")
public class Worker extends User {

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "rating_avg", nullable = false, precision = 3, scale = 2)
    private BigDecimal ratingAvg = BigDecimal.ZERO;

    @Column(name = "total_services", nullable = false)
    private int totalServices = 0;

    @Column(nullable = false)
    private boolean verified = false;

    protected Worker() {}

    public Worker(String email, String phone, String passwordHash, String firstName, String lastName) {
        super(email, phone, passwordHash, firstName, lastName);
    }

    @Override
    public UserType getUserType() {
        return UserType.WORKER;
    }

    public boolean isTopRated() {
        return ratingAvg.compareTo(new BigDecimal("4.50")) >= 0 && totalServices >= 5;
    }

    public String getBio() { return bio; }
    public BigDecimal getRatingAvg() { return ratingAvg; }
    public int getTotalServices() { return totalServices; }
    public boolean isVerified() { return verified; }
    public void setBio(String bio) { this.bio = bio; }
    public void setVerified(boolean verified) { this.verified = verified; }
}
