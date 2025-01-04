package pi.raspberry.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import pi.raspberry.entity.User;
import pi.raspberry.dto.LoginRequest;
import pi.raspberry.services.UserService;
import pi.raspberry.util.JwtUtil;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

  @Autowired
  private UserService userService;

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired
  private JwtUtil jwtUtil;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    String username = request.getUsername();
    String password = request.getPassword();

    User user = userService.findByUsername(username);

    if (user == null || !bCryptPasswordEncoder.matches(password, user.getPassword())) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
    }

    String token = jwtUtil.generateToken(username);
    return ResponseEntity.ok(token);
  }

  @GetMapping("test")
  public String test(){
	  return "Test";
  }

  @PostMapping("/register")
  public ResponseEntity<String> registerUser(@RequestBody User user) {
    try {
      if (userService.findByUsername(user.getUsername()) != null) {
        return new ResponseEntity<>("Username is already taken", HttpStatus.BAD_REQUEST);
      }
      userService.saveUser(user);
      return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>("An error occured during registration. Please try again later.",
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
