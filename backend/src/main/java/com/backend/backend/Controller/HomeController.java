package com.backend.backend.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        // Trả về trang index.html của React (nằm trong static)
        return "index.html";
    }
}