package com.example.LearningAndDevelopment.Model.DTO;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ManagerDTO {
    private long accountId;

    @NotBlank(message = "Account name is mandatory")
    private String accountName;

    @NotBlank(message = "Username is mandatory")
    private String username;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is mandatory")
    private String password;

    public long getAccountId() {
        return accountId;
    }

    public void setAccountId(long accountId) {
        this.accountId = accountId;
    }

    public @NotBlank(message = "Account name is mandatory") String getAccountName() {
        return accountName;
    }

    public void setAccountName(@NotBlank(message = "Account name is mandatory") String accountName) {
        this.accountName = accountName;
    }

    public @NotBlank(message = "Username is mandatory") String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank(message = "Username is mandatory") String username) {
        this.username = username;
    }

    public @NotBlank(message = "Email is mandatory") @Email(message = "Email should be valid") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "Email is mandatory") @Email(message = "Email should be valid") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Password is mandatory") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password is mandatory") String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "ManagerDTO{" +
                "accountId=" + accountId +
                ", accountName='" + accountName + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}