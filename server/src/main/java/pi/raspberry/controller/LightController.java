package pi.raspberry.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import pi.raspberry.services.GpioService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LightController {
  @Autowired
    private GpioService gpioService;

  private boolean light1Status = false;
  @GetMapping("/l1")
  public ResponseEntity<String> getLight1Status() {
    if (SecurityContextHolder.getContext().getAuthentication() != null &&
        SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {

      return ResponseEntity.ok("Light 1 is " + (light1Status ? "ON" : "OFF"));
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
    }
  }

  @PostMapping("/l1/toggle")
  public ResponseEntity<String> toggleLight1Status() {
    if (SecurityContextHolder.getContext().getAuthentication() != null &&
        SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {

      gpioService.toggleLed();
      light1Status = !light1Status;
      return ResponseEntity.ok("Light 1 is now " + (light1Status ? "ON" : "OFF"));
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
    }
  }
}
