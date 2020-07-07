package com.example.demo;

import java.util.List;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DemoController {
	
	private static List<User> users = new ArrayList<>();
	private static List<AuthUser> authUsers = new ArrayList<>();

	static {
		users.add(new User(0, "Jake", "Hall", 12));
		users.add(new User(1, "John", "Doe", 21));
		users.add(new User(2, "Jane", "Doe", 22));
		users.add(new User(3, "Claire", "Angel", 18));

		authUsers.add(new AuthUser("admin", "admin123"));
	}

	@PostMapping("/register")
	ResponseEntity<String> registerNewUser(@RequestBody AuthUser newUser) {
		AuthUser selectedUser = null;
		for (AuthUser authUser : authUsers) {
			if (authUser.username.equals(newUser.username)) {
				selectedUser = authUser;
				break;
			}
		}
		if (selectedUser == null) {
			authUsers.add(new AuthUser(newUser.username, newUser.password));
			return new ResponseEntity<>(newUser.username, HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Username exists", HttpStatus.FORBIDDEN);
		}
	}

	@PostMapping("/login")
	ResponseEntity<String> getLoginStatus(@RequestBody AuthUser logUser) {
		AuthUser selectedUser = null;
		for (AuthUser authUser : authUsers) {
			if (authUser.username.equals(logUser.username)) {
				selectedUser = authUser;
				break;
			}
		}
		if (selectedUser != null && selectedUser.password.equals(logUser.password)) {
			return new ResponseEntity<>(logUser.username, HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
		}
	}

	@GetMapping("/users")
	List<User> getAllUsers() {
		return users;
	}

	@GetMapping("/users/{id}")
	ResponseEntity<User> getUserById(@RequestHeader("loginUser") String loginUser, @PathVariable int id) {
		if ("N".equals(loginUser)) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} else {
			return new ResponseEntity<>(users.get(id), HttpStatus.OK);
		}
	}

	@PostMapping("/users")
	ResponseEntity createNewUser(@RequestHeader("loginUser") String loginUser, @RequestBody User newUser) {
		if ("N".equals(loginUser)) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} else {
			users.add(newUser);
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}

	@PutMapping("/users/{id}")
	ResponseEntity updateUser(@RequestHeader("loginUser") String loginUser, @RequestBody User newUser, @PathVariable int id) {
		if ("N".equals(loginUser)) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} else {
			User selectedUser = users.get(id);
			if (selectedUser != null) {
				selectedUser.firstName = newUser.firstName;
				selectedUser.lastName = newUser.lastName;
				selectedUser.age = newUser.age;
			}
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}

	@DeleteMapping("/users/{id}")
	ResponseEntity deleteUser(@RequestHeader("loginUser") String loginUser, @PathVariable int id) {
		if ("N".equals(loginUser)) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} else {
			users.remove(id);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		
	}

}

class User {

	public int id;
	public String firstName;
	public String lastName;
	public int age;

	public User(int id, String fname, String lname, int age) {
		this.id = id;
		this.firstName = fname;
		this.lastName = lname;
		this.age = age;
	}

}

class AuthUser {

	public String username;
	public String password;

	public AuthUser(String name, String pass) {
		this.username = name;
		this.password = pass;
	}

}

/**
 * Always add user id as its actual index else it will fail - only for the angular http section
 */
