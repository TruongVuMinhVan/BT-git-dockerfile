package com.example.TruongVuMinhVan_2280603646.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/project")
    public String project() {
        return "project";
    }
}
