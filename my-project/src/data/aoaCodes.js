// src/data/aoaCodes.js
export const AOA_CODES = [
  {
    title: "🧑‍🎓 Student Class Program",
    code: `
import java.util.*;

class Student {
    String name;
    int rollNumber;
    float marks;

    void input() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter name: ");
        name = sc.nextLine();
        System.out.print("Enter roll number: ");
        rollNumber = sc.nextInt();
        System.out.print("Enter marks: ");
        marks = sc.nextFloat();
    }

    void display() {
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Marks: " + marks);
    }

    public static void main(String[] args) {
        Student s = new Student();
        s.input();
        s.display();
    }
}
    `,
  },
  {
    title: "🏦 BankAccount Class Program",
    code: `
import java.util.*;

class BankAccount {
    String name;
    int accNo;
    double balance;

    void input(Scanner sc) {
        System.out.print("Enter name: ");
        name = sc.nextLine();
        System.out.print("Enter account number: ");
        accNo = sc.nextInt();
        System.out.print("Enter balance: ");
        balance = sc.nextDouble();
    }

    void deposit(double amt) { balance += amt; }
    void withdraw(double amt) { balance -= amt; }

    void display() {
        System.out.println("Name: " + name);
        System.out.println("Account No: " + accNo);
        System.out.println("Balance: " + balance);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        BankAccount b = new BankAccount();
        b.input(sc);
        System.out.print("Enter amount to deposit: ");
        b.deposit(sc.nextDouble());
        System.out.print("Enter amount to withdraw: ");
        b.withdraw(sc.nextDouble());
        b.display();
        sc.close();
    }
}
    `,
  },
  {
    title: "💼 Employee Class Program",
    code: `
import java.util.*;

class Employee {
    String name;
    int id;
    double salary;

    void input() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter name: ");
        name = sc.nextLine();
        System.out.print("Enter id: ");
        id = sc.nextInt();
        System.out.print("Enter salary: ");
        salary = sc.nextDouble();
    }

    void display() {
        System.out.println("Name: " + name);
        System.out.println("ID: " + id);
        System.out.println("Salary: " + salary);
    }

    public static void main(String[] args) {
        Employee e = new Employee();
        e.input();
        e.display();
    }
}
    `,
  },
  {
    title: "🔢 Even or Odd Program",
    code: `
import java.io.*;

class EvenOdd {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        System.out.print("Enter a number: ");
        int n = Integer.parseInt(br.readLine());
        System.out.println(n % 2 == 0 ? "Even" : "Odd");
    }
}
    `,
  },
  {
    title: "📏 Rectangle Area Program",
    code: `
import java.util.Scanner;

public class Rectangle {
    double l, b;
    Scanner sc = new Scanner(System.in);

    void input() {
        System.out.print("Enter length and breadth: ");
        l = sc.nextDouble();
        b = sc.nextDouble();
    }

    void area() {
        System.out.println("Area of Rectangle: " + (l * b));
    }

    public static void main(String[] args) {
        Rectangle r = new Rectangle();
        r.input();
        r.area();
    }
}
    `,
  },
  {
    title: "🔢 NumberFormatException Example",
    code: `
import java.util.Scanner;

public class NumberFormatExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a number: ");
        String input = sc.nextLine();

        try {
            int number = Integer.parseInt(input);
            System.out.println("You entered number: " + number);
        } 
        catch (NumberFormatException e) {
            System.out.println("Error: Invalid number format! Please enter digits only.");
        }

        sc.close();
    }
}
    `,
  },
  {
    title: "⚠️ ArithmeticException Example",
    code: `
import java.util.Scanner;

public class ArithmeticExceptionExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter numerator: ");
        int numerator = sc.nextInt();

        System.out.print("Enter denominator: ");
        int denominator = sc.nextInt();

        try {
            int result = numerator / denominator;
            System.out.println("Result: " + result);
        } 
        catch (ArithmeticException e) {
            System.out.println("Error: Division by zero is not allowed!");
        }

        sc.close();
    }
}
    `,
  },
  {
    title: "🌈 Automatic Background Color Changer",
    code: `
<!DOCTYPE html>
<html>
<head>
  <title>Automatic Background Color Changer</title>
  <style>
    body {
      text-align: center;
      font-family: Arial, sans-serif;
      color: white;
      transition: background-color 1s ease;
      margin-top: 200px;
    }
  </style>
</head>
<body>
  <h1>🌈 Background Color Changing Automatically</h1>
  <p>Watch the background color change every 5 seconds!</p>

  <script>
    function getRandomColor() {
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    function changeBackgroundColor() {
      let newColor = getRandomColor();
      document.body.style.backgroundColor = newColor;
      console.log("Background changed to:", newColor);
    }

    setInterval(changeBackgroundColor, 5000);
    changeBackgroundColor();
  </script>
</body>
</html>
    `,
  },
  {
    title: "📧 Email Validation Form",
    code: `
<!DOCTYPE html>
<html>
<head>
  <title>Email Validation using JavaScript</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      margin-top: 150px;
      background-color: #f2f2f2;
    }
    form {
      background: white;
      padding: 30px;
      border-radius: 10px;
      display: inline-block;
      box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
    }
    input {
      padding: 10px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #ccc;
      width: 250px;
    }
    button {
      margin-top: 10px;
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover { background-color: #0056b3; }
    #message { margin-top: 10px; font-weight: bold; }
  </style>
</head>
<body>
  <h2>Email Validation Form</h2>
  <form onsubmit="return validateEmail()">
    <label>Enter your email: </label><br><br>
    <input type="text" id="email" placeholder="example@gmail.com" onkeyup="checkEmail()"><br><br>
    <button type="submit">Submit</button>
    <div id="message"></div>
  </form>

  <script>
    const pattern = /^[^ ]+@[^ ]+\\.[a-z]{2,3}$/;

    function validateEmail() {
      let email = document.getElementById("email").value;
      if (email.match(pattern)) {
        alert("✅ Email is valid!");
        return true;
      } else {
        alert("❌ Invalid email! Please re-enter a valid email address.");
        document.getElementById("email").focus();
        return false;
      }
    }

    function checkEmail() {
      let email = document.getElementById("email").value;
      let msg = document.getElementById("message");
      if (email === "") { msg.textContent = ""; return; }
      if (email.match(pattern)) {
        msg.textContent = "✅ Looks good!";
        msg.style.color = "green";
      } else {
        msg.textContent = "❌ Invalid email format";
        msg.style.color = "red";
      }
    }
  </script>
</body>
</html>
    `,
  },
  {
    title: "🚗 Multi-Level Inheritance - Maruti800",
    code: `
import java.util.Scanner;

public class Maruti800 extends Maruti {
    int speed;

    void setSpeed(int s) { speed = s; }
    void displaySpeed() { System.out.println("Speed: " + speed + " km/h"); }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Maruti800 car = new Maruti800();

        System.out.print("Enter Vehicle Type: ");
        car.setVehicleType(sc.nextLine());
        System.out.print("Enter Brand: ");
        car.setBrand(sc.nextLine());
        System.out.print("Enter Speed (km/h): ");
        car.setSpeed(sc.nextInt());

        System.out.println("\\n--- Vehicle Details ---");
        car.displayVehicleType();
        car.displayBrand();
        car.displaySpeed();

        sc.close();
    }
}

class Maruti extends Car {
    String brand;
    void setBrand(String b) { brand = b; }
    void displayBrand() { System.out.println("Brand: " + brand); }
}

class Car {
    String vehicleType;
    void setVehicleType(String type) { vehicleType = type; }
    void displayVehicleType() { System.out.println("Vehicle Type: " + vehicleType); }
}
    `,
  },
  {
    title: "🔺 Abstract Class Example - ShapeDemo",
    code: `
import java.util.Scanner;

public class ShapeDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        Rectangle rect = new Rectangle();
        System.out.println("=== Rectangle ===");
        rect.getData(sc);
        rect.displayArea();

        Triangle tri = new Triangle();
        System.out.println("\\n=== Triangle ===");
        tri.getData(sc);
        tri.displayArea();

        sc.close();
    }
}

abstract class Shape {
    double dim1, dim2;
    void getData(Scanner sc) {
        System.out.print("Enter first dimension: ");
        dim1 = sc.nextDouble();
        System.out.print("Enter second dimension: ");
        dim2 = sc.nextDouble();
    }
    abstract void displayArea();
}

class Rectangle extends Shape {
    void displayArea() { System.out.println("Area of Rectangle: " + dim1*dim2); }
}

class Triangle extends Shape {
    void displayArea() { System.out.println("Area of Triangle: " + 0.5*dim1*dim2); }
}
    `,
  },
  {
    title: "🔐 Design a login webpage in JSP that makes validation through Database using JDBCp",
    code: `
import java.util.HashMap;
import java.util.Scanner;

public class LoginDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        HashMap<String, String> users = new HashMap<>();
        users.put("mayur", "12345");
        users.put("admin", "admin123");
        users.put("user1", "pass1");

        System.out.println("=== Login Page ===");
        System.out.print("Enter username: ");
        String username = sc.nextLine();
        System.out.print("Enter password: ");
        String password = sc.nextLine();

        if(users.containsKey(username) && users.get(username).equals(password)) {
            System.out.println("✅ Login Successful! Welcome, " + username);
        } else {
            System.out.println("❌ Invalid username or password! Try again.");
        }

        sc.close();
    }
}
    `,
  },
  {
    title: "🔄 WAP to demonstrate  method and constructor overloading",
    code: `
import java.util.Scanner;

public class OverloadingDemo {
    String name;
    int age;

    OverloadingDemo() { name="Unknown"; age=0; }
    OverloadingDemo(String n, int a) { name=n; age=a; }

    void display() { System.out.println("Name: " + name + "\\nAge: " + age); }
    void display(String greeting) { System.out.println(greeting + " " + name + "! Your age is " + age); }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        OverloadingDemo obj1 = new OverloadingDemo();
        System.out.println("=== Object 1 ===");
        obj1.display();

        System.out.print("\\nEnter your name: ");
        String n = sc.nextLine();
        System.out.print("Enter your age: ");
        int a = sc.nextInt();

        OverloadingDemo obj2 = new OverloadingDemo(n, a);
        System.out.println("=== Object 2 ===");
        obj2.display();
        obj2.display("Hello");

        sc.close();
    }
}
    `,
  },
  {
    title: "Program to create a static website using HTML and CSS",
    code: `14, <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Static Website</title>
<style>
body { font-family: Arial; margin:0; text-align:center; background:#f0f0f0; }
header { background:#007bff; color:white; padding:15px; }
section { padding:20px; }
footer { background:#333; color:white; padding:10px; position:fixed; bottom:0; width:100%; }
</style>
</head>
<body>
<header><h1>Welcome to My Website</h1></header>
<section>
  <h2>About</h2>
  <p>This is a simple static website created using HTML and CSS.</p>
</section>
<footer>&copy; 2025 My Website</footer>
</body>
</html>
    `,
  }
];
