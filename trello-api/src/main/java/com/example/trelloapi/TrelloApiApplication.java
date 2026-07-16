package com.example.trelloapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example")
public class TrelloApiApplication {
  public static void main(String[] args) {
    SpringApplication.run(TrelloApiApplication.class, args);
  }
}
