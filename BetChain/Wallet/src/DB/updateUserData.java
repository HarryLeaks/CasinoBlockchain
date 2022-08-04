package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class updateUserData {
	private static final String sql = "UPDATE utilizador SET ";
	private static final String sql2 = " = ? WHERE IdUtilizador = ?";
	
	Connection connection = null;
	PreparedStatement preparedStatement = null;
	ResultSet resultSet = null;
	
	public updateUserData(String command, String str, int IdUtilizador) throws SQLException{
		connection = ConnectionUtil.connectdb();
		try {
			preparedStatement = connection.prepareStatement(sql + command + sql2);
			preparedStatement.setString(1, str);
			preparedStatement.setString(2, String.valueOf(IdUtilizador));
			preparedStatement.executeUpdate();
			preparedStatement.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
