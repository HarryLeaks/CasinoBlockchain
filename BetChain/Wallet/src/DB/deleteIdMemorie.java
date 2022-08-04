package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import serialization.Motherboard;

public class deleteIdMemorie extends Motherboard{
	private static final String sql = "DELETE FROM savepass WHERE motherboardID = ?";
	
	Connection connection = null;
	PreparedStatement preparedStatement = null;
	boolean resultSet;
	
	public deleteIdMemorie() {
		connection = ConnectionUtil.connectdb();
		String id = Motherboard.getWindowsMotherBoardSerialNumber();
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setString(1, id);
			resultSet = preparedStatement.execute();
			preparedStatement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
