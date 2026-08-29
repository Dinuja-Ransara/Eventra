package com.eventmanagement.portal.dto;

public class LoginResponse {
    private boolean success;
    private String role;
    private String name;
    private String message;

    public LoginResponse(boolean success, String role, String name, String message) {
        this.success = success;
        this.role = role;
        this.name = name;
        this.message = message;
    }

    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}