package com.eventmanagement.portal.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        // Maps URL requests starting with /sources/ to the physical folder on disk
        registry.addResourceHandler("/sources/**")
                .addResourceLocations("file:src/main/resources/static/sources/");
    }
}