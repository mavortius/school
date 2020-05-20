package com.openmind.school;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CoursesController {
  private final CourseRepository repository;

  public CoursesController(CourseRepository repository) {
    this.repository = repository;
  }

  @GetMapping("/{username}")
  public List<Course> getAllByUsername(@PathVariable String username) {
    return repository.findAllByUsername(username);
  }

  @GetMapping("/{username}/{courseId}")
  public ResponseEntity<Course> getCourseByUsernameAndId(@PathVariable String username, @PathVariable Long courseId) {
    return ResponseEntity.of(repository.findByUsernameAndId(username, courseId));
  }

  @PostMapping("/{username}")
  public ResponseEntity<Course> createCourse(@PathVariable String username, @RequestBody Course course) {
    Course newCourse = new Course(username, course.getDescription());
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
            .buildAndExpand(repository.save(newCourse).getId()).toUri();
    return ResponseEntity.created(uri).build();
  }

  @PutMapping("/{username}/{courseId}")
  public ResponseEntity<Course> updateCourse(@PathVariable String username, @PathVariable Long courseId, @RequestBody Course course) {
    Course courseToUpdate = repository.findByUsernameAndId(username, courseId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    BeanUtils.copyProperties(course, courseToUpdate, "id");
    repository.save(courseToUpdate);
    return ResponseEntity.ok(courseToUpdate);
  }

  @DeleteMapping("/{username}/{courseId}")
  public ResponseEntity<Void> deleteCourseByUsername(@PathVariable String username, @PathVariable Long courseId) {
    Course courseToDelete = repository.findByUsernameAndId(username, courseId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    repository.delete(courseToDelete);
    return ResponseEntity.noContent().build();
  }
}
