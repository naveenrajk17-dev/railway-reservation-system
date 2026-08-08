package com.railway.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private int userId;
    private String name;
    private String email;
    private String role;
}