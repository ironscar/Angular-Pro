package com.example.demo;

import java.util.List;
import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {
	
	private static List<User> users = new ArrayList<>();

	/* 
	 * implement a server secret key with RSA or HMAC to set up auth
	 * https://www.geeksforgeeks.org/message-authentication-codes/?ref=lbp - Network Security
	 * https://jwt.io/introduction/ - JSON web tokens
	 */
	private static List<AuthUser> authUsers = new ArrayList<>();

	static {
		users.add(new User(0, "Jake", "Hall", 12));
		users.add(new User(1, "John", "Doe", 21));
		users.add(new User(2, "Jane", "Doe", 22));
		users.add(new User(3, "Claire", "Angel", 18));
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/users")
	List<User> getAllUsers() {
		return users;
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/users/{id}")
	User getUserById(@PathVariable int id) {
		return users.get(id);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/users")
	void createNewUser(@RequestBody User newUser) {
		users.add(newUser);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping("/users/{id}")
	void updateUser(@RequestBody User newUser, @PathVariable int id) {
		User selectedUser = users.get(id);
		if (selectedUser != null) {
			selectedUser.firstName = newUser.firstName;
			selectedUser.lastName = newUser.lastName;
			selectedUser.age = newUser.age;
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("/users/{id}")
	void deleteUser(@PathVariable int id) {
		users.remove(id);
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

	public int id;
	public String username;
	public String password;

	public AuthUser(int id, String name, String pass) {
		this.id = id;
		this.username = name;
		this.password = pass;
	}

}

/**
 * Always add user id as its actual index else it will fail - only for the angular http section
 */
