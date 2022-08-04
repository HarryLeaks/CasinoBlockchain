package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class updatePass {
	private static final String sql = "UPDATE utilizador SET PalavraPasse = ? WHERE IdUtilizador = ?";
	Connection connection = null;
	PreparedStatement preparedStatement = null;
	int resultSet;
	
	public updatePass(String pass, int id){
		connection = ConnectionUtil.connectdb();
		
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setString(1, pass);
			preparedStatement.setInt(2, id);
			resultSet = preparedStatement.executeUpdate();
			preparedStatement.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
