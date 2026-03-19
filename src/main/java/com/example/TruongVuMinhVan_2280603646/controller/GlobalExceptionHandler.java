package com.example.TruongVuMinhVan_2280603646.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public String handleException(Exception ex, Model model) {
        model.addAttribute("error", ex.getMessage());
        model.addAttribute("status", "ERROR");
        return "error";
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public String handle404(NoResourceFoundException ex, Model model) {
        model.addAttribute("error", "Page not found: /" + ex.getResourcePath());
        model.addAttribute("status", "404");
        model.addAttribute("path", "/" + ex.getResourcePath());
        return "error";
    }
}
