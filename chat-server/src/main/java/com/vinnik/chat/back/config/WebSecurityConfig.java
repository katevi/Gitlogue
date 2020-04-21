package com.vinnik.chat.back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@ComponentScan(basePackages = { "com.vinnik.chat.back" })
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public PasswordEncoder encoder() {
        //how many iterations used in crypt
        final int iterationsCount = 11;
        return new BCryptPasswordEncoder(iterationsCount);
    }

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        //FIXME IN NEXT PR: all requests can register new user
        http.csrf().disable().authorizeRequests().antMatchers("/*").permitAll();
        http.cors().and();
    }
}
