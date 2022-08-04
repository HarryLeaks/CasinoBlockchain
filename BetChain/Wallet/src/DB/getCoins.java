package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class getCoins {
	private static final String sql = "SELECT BetCoins FROM utilizador WHERE IdUtilizador = ?";
	
	Connection connection = null;
	PreparedStatement preparedStatement = null;
	ResultSet resultSet = null;
	
	private float BetCoins = 0;
	
	public getCoins(int id) {
		connection = ConnectionUtil.connectdb();
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setString(1, Integer.toString(id));
			resultSet = preparedStatement.executeQuery();
			if(resultSet.next()) {
				BetCoins = resultSet.getFloat(1);
			}
			preparedStatement.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public float getBetCoins() {
		return BetCoins;
	}
}
