package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class MotherBoardIDChecker {
	Connection connection = null;
	PreparedStatement preparedStatement = null;
	ResultSet resultSet;
	
	private static final String sql = "SELECT IdUtilizador FROM Savepass WHERE motherboardId = ?";
	
	private static int IdUtilizador;
	
	public boolean IDChecker(String MotherBoardID) {
		connection = ConnectionUtil.connectdb();
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setString(1, MotherBoardID);
			resultSet = preparedStatement.executeQuery();
			if(!resultSet.next()){
				return false;
			}else{
				IdUtilizador = resultSet.getInt(1);
				return true;
			}
		}catch(Exception e) {
			
		}
		return false;
	}
	
	public int getIdUtilizador() {
		return IdUtilizador;
	}
}
