package jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBC {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		try {
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/blogdb2?createDatabaseIfNotExist=true","root","root12345");
		//System.out.println(con);
		
		Statement s = con.createStatement();
		ResultSet r = s.executeQuery("select * from users where id=2");
		
		r.next();
		int id = r.getInt("id");
		String mail = r.getString("email");
		String name = r.getString("full_name");
		
		System.out.println(id+" " + mail + " " + name);
		s.close();
		con.close();
		
		} catch(SQLException e) {
			e.printStackTrace();
		}
	}

}
