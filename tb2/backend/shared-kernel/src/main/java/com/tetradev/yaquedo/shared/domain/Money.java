package com.tetradev.yaquedo.shared.domain;

import jakarta.persistence.Embeddable;

import java.math.BigDecimal;
import java.util.Objects;

@Embeddable
public class Money {

    private BigDecimal amount;
    private String currency;

    protected Money() {}

    public Money(BigDecimal amount, String currency) {
        if (amount == null || amount.signum() < 0) {
            throw new IllegalArgumentException("amount must be non-negative");
        }
        if (currency == null || currency.isBlank()) {
            throw new IllegalArgumentException("currency is required");
        }
        this.amount = amount;
        this.currency = currency;
    }

    public static Money pen(BigDecimal amount) {
        return new Money(amount, "PEN");
    }

    public BigDecimal getAmount() { return amount; }
    public String getCurrency() { return currency; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Money m)) return false;
        return Objects.equals(amount, m.amount) && Objects.equals(currency, m.currency);
    }

    @Override
    public int hashCode() { return Objects.hash(amount, currency); }
}
