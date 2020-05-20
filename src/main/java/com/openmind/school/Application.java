package com.openmind.school;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.ErrorPageRegistrar;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class Application implements CommandLineRunner {

  private final CourseRepository courseRepository;

  public Application(CourseRepository courseRepository) {
    this.courseRepository = courseRepository;
  }

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

  @Override
  public void run(String... args) {
    List<Course> courses = Arrays.asList(
            new Course("mavortius", "Learn Full stack with Spring Boot and Angular"),
            new Course("mavortius", "Learn Full stack with Spring Boot and React"),
            new Course("mavortius", "Master Microservices with Spring Boot and Spring Cloud"),
            new Course("mavortius", "Deploy Spring Boot Microservices to Cloud with Docker and Kubernetes")
    );
    this.courseRepository.saveAll(courses);
  }

  @Bean
  public ErrorPageRegistrar errorPageRegistrar() {
    return registry -> registry.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/index.html"));
  }
}
