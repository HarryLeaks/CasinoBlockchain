package DB;

import java.sql.Connection;
import java.sql.DriverManager;

import javax.swing.JOptionPane;

public class ConnectionUtil {
	private static final String DATABASE_URL = "jdbc:mysql://localhost:3306/wallet";
	private static final String DATABASE_USERNAME = "root";
	
	Connection conn = null;
	public static Connection connectdb() {
		try {
			Connection conn = DriverManager.getConnection(DATABASE_URL, DATABASE_USERNAME, "");
			return conn;
		}catch(Exception e) {
			JOptionPane.showMessageDialog(null, e);
			return null;
		}
	}
}
