package jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
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
            
            // Reading data from the users table
            ResultSet r = s.executeQuery("SELECT * FROM users");
            
            // Displaying all records
            while (r.next()) {
                int id = r.getInt("id");
                String email = r.getString("email");
                String fullName = r.getString("full_name");
                System.out.println(id + " " + email + " " + fullName);
            }
            
            // Creating a new user
            String insertQuery = "INSERT INTO users (email, full_name) VALUES (?, ?)";
            PreparedStatement insertStatement = con.prepareStatement(insertQuery);
            insertStatement.setString(1, "newuser@example.com");
            insertStatement.setString(2, "New User");
            int rowsInserted = insertStatement.executeUpdate();
            if (rowsInserted > 0) {
                System.out.println("New user inserted successfully!");
            }
            
            // Updating an existing user
            String updateQuery = "UPDATE users SET full_name = ? WHERE id = ?";
            PreparedStatement updateStatement = con.prepareStatement(updateQuery);
            updateStatement.setString(1, "Updated Name");
            updateStatement.setInt(2, 1); // Assuming user with id 1 exists
            int rowsUpdated = updateStatement.executeUpdate();
            if (rowsUpdated > 0) {
                System.out.println("User updated successfully!");
            }
            
            // Deleting a user
            String deleteQuery = "DELETE FROM users WHERE id = ?";
            PreparedStatement deleteStatement = con.prepareStatement(deleteQuery);
            deleteStatement.setInt(1, 2); // Assuming user with id 2 exists
            int rowsDeleted = deleteStatement.executeUpdate();
            if (rowsDeleted > 0) {
                System.out.println("User deleted successfully!");
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
