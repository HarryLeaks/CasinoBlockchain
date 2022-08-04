package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class updateUnminedTransactions {
	private static final String sql = "UPDATE transactions SET MinedTransaction = '1' WHERE MinedTransaction = '0' AND Node = " + Wallet.Main.getLinkBlockchain().substring(Wallet.Main.getLinkBlockchain().length() - 4);

	Connection connection = null;
	PreparedStatement preparedStatement = null;
	int resultSet;
	
	public updateUnminedTransactions(){
		connection = ConnectionUtil.connectdb();
		try {
			preparedStatement = connection.prepareStatement(sql);
			resultSet = preparedStatement.executeUpdate();
			preparedStatement.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
