<?php

class User {
  private $conn;
  private $table_name = "users";

  public $id;
  public $name;
  public $email;
  public $password;
  public $dob;

  public function __construct($db) {
      $this->conn = $db;
  }

  // Create User
  public function create() {
      $query = "INSERT INTO " . $this->table_name . " 
                SET name=:name, email=:email, 
                    password=:password, dob=:dob";
      
      $stmt = $this->conn->prepare($query);

      // Hash password
      $hashed_password = password_hash($this->password, PASSWORD_BCRYPT);

      // Bind values
      $stmt->bindParam(":name", $this->name);
      $stmt->bindParam(":email", $this->email);
      $stmt->bindParam(":password", $hashed_password);
      $stmt->bindParam(":dob", $this->dob);

      if ($stmt->execute()) {
          return $this->conn->lastInsertId();
      }
      return false;
  }

  // Read Users
  public function read() {
      $query = "SELECT id, name, email, dob, created_at 
                FROM " . $this->table_name . " 
                ORDER BY created_at DESC";
      
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      
      return $stmt;
  }

  // Read Single User
  public function readOne() {
      $query = "SELECT id, name, email, dob 
                FROM " . $this->table_name . " 
                WHERE id = ? LIMIT 0,1";
      
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $this->id);
      $stmt->execute();
      
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      
      $this->name = $row['name'];
      $this->email = $row['email'];
      $this->dob = $row['dob'];
  }

  // Update User
  public function update() {
      $query = "UPDATE " . $this->table_name . "
                SET name = :name, 
                    email = :email, 
                    " . ($this->password ? "password = :password, " : "") . "
                    dob = :dob
                WHERE id = :id";
      
      $stmt = $this->conn->prepare($query);
      
      // Bind values
      $stmt->bindParam(":name", $this->name);
      $stmt->bindParam(":email", $this->email);
      $stmt->bindParam(":dob", $this->dob);
      $stmt->bindParam(":id", $this->id);
      
      // Hash password if provided
      if ($this->password) {
          $hashed_password = password_hash($this->password, PASSWORD_BCRYPT);
          $stmt->bindParam(":password", $hashed_password);
      }

      return $stmt->execute();
  }

  // Delete User
  public function delete() {
      $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
      
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $this->id);
      
      return $stmt->execute();
  }
}