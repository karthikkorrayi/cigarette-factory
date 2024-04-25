# Introduction to Database Connectivity using Java (JDBC)

In this introduction, we'll cover the basics of JDBC (Java Database Connectivity) and demonstrate database connection and CRUD (Create, Read, Update, Delete) operations using MySQL as the backend database.

## 1. Introduction to JDBC

JDBC is a Java API for connecting and executing SQL statements to interact with databases. It provides a standard interface for accessing relational databases from Java.

## 2. Database Connection

We establish a connection to a MySQL database using JDBC. Below is a Java program demonstrating database connection:

```java
package jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBC {

    public static void main(String[] args) {
        try {
            // Establishing a database connection
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/blogdb2?createDatabaseIfNotExist=true","root","root12345");
            
            // Creating a statement object
            Statement s = con.createStatement();
            
            // Executing a SQL query
            ResultSet r = s.executeQuery("SELECT * FROM users WHERE id=2");
            
            // Processing the result set
            if (r.next()) {
                int id = r.getInt("id");
                String email = r.getString("email");
                String name = r.getString("full_name");
                System.out.println(id + " " + email + " " + name);
            }
            
            // Closing resources
            r.close();
            s.close();
            con.close();
            
        } catch(SQLException e) {
            e.printStackTrace();
        }
    }
}
```



# References

## Eclipse IDE

- Eclipse is a popular integrated development environment (IDE) used for Java development.
- It offers a wide range of features such as code editing, debugging, version control integration, and more.
- Website: [Eclipse Official Website](https://www.eclipse.org/)

## Connector/J

- Connector/J is a JDBC driver that enables Java applications to connect to MySQL and MariaDB databases.
- It provides functionalities for establishing connections, executing queries, processing results, and more.
- Download: [Connector/J Download Page](https://dev.mysql.com/downloads/connector/j/)


