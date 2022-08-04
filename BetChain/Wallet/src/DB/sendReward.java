package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class sendReward {
	private static final String updateAmounts = "UPDATE utilizador SET BetCoins = ? WHERE IdUtilizador = ?";
	
	Connection connection = null;
	PreparedStatement preparedStatement = null;
	ResultSet resultSet;
	
	public sendReward(int id, float amount) throws SQLException {
		connection = ConnectionUtil.connectdb();

		preparedStatement = connection.prepareStatement(updateAmounts);
		preparedStatement.setFloat(1, amount);
		preparedStatement.setString(2, Integer.toString(id));
		amount = preparedStatement.executeUpdate();;
		preparedStatement.close();
	}

}
