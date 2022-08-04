package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class IDMemorie {
	private static final String set1 = "SET FOREIGN_KEY_CHECKS=0";
	private static final String sql = "INSERT INTO Savepass "
			+ "(motherboardID, pass, IdUtilizador) "
			+ "VALUES (?, ?, ?)";
	private static final String set2 = "SET FOREIGN_KEY_CHECKS=1";
	
	Connection connection = null;
	PreparedStatement preparedStatement = null;
	int resultSet;
	
	public IDMemorie(String MotherBoardID, String pass, int IdUtilizador) {
		connection = ConnectionUtil.connectdb();
		
		try {
			preparedStatement = connection.prepareStatement(set1);
			resultSet = preparedStatement.executeUpdate();
			preparedStatement.close();
			
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setString(1, MotherBoardID);
			preparedStatement.setString(2, pass);
			preparedStatement.setString(3, Integer.toString(IdUtilizador));
			resultSet = preparedStatement.executeUpdate();
			preparedStatement.close();
			
			preparedStatement = connection.prepareStatement(set2);
			resultSet = preparedStatement.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public int getResult() {
		return resultSet;
	}
}
