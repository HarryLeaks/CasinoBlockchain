package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.Date;

public class sendCoins {
	private static final String getAmounts = "SELECT BetCoins FROM utilizador WHERE PublicAddress = ?"; //get sender and receiver amounts
	private static final String updateAmounts = "UPDATE utilizador SET BetCoins = ? WHERE PublicAddress = ?"; //update the sender and receiver amounts
	private static final String idBeforeTransaction = "INSERT INTO beforegametransaction (IdUtilizador, BetAmount, IsDebit) VALUES (?, ?, ?)";
	private static final String getIdBeforeTransaction = "SELECT IdBeforeTransaction FROM beforegametransaction ORDER BY IdBeforeTransaction DESC LIMIT 1";
	private static final String makeTransaction = "INSERT INTO transactions (IdBeforeTransaction, SenderPublicAddress, SenderPrivateAddress, ReceiverPublicAddress, MinedTransaction, TimeStamp, Amount, Node) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"; //insert unmined transaction

	Connection connection = null;
	PreparedStatement preparedStatement = null;
	ResultSet resultSet;
	private float senderAmount, receiverAmount;
	int idBeforeGame;
	
	public sendCoins(String senderAddr, String senderPrivateAddr, String receiverAddr, float amount, String idUtilizador, int Node){
		connection = ConnectionUtil.connectdb();
		try {
			preparedStatement = connection.prepareStatement(getAmounts);
			preparedStatement.setString(1, senderAddr);
			resultSet = preparedStatement.executeQuery();
			while(resultSet.next()) {
				senderAmount = resultSet.getFloat(1);
			}
			preparedStatement.close();
		
			preparedStatement = connection.prepareStatement(getAmounts);
			preparedStatement.setString(1, receiverAddr);
			resultSet = preparedStatement.executeQuery();
			while(resultSet.next()) {
				receiverAmount = resultSet.getFloat(1);
			}
			preparedStatement.close();
			
			senderAmount -= amount;
			receiverAmount += amount;
			
			preparedStatement = connection.prepareStatement(updateAmounts);
			preparedStatement.setFloat(1, senderAmount);
			preparedStatement.setString(2, senderAddr);
			senderAmount = preparedStatement.executeUpdate();
			preparedStatement.close();
			
			preparedStatement = connection.prepareStatement(updateAmounts);
			preparedStatement.setFloat(1, receiverAmount);
			preparedStatement.setString(2, receiverAddr);
			senderAmount = preparedStatement.executeUpdate();
			preparedStatement.close();
			
			preparedStatement = connection.prepareStatement(idBeforeTransaction);
			preparedStatement.setString(1, idUtilizador);
			preparedStatement.setFloat(2, amount);
			preparedStatement.setString(3, "1");
			senderAmount = preparedStatement.executeUpdate();
			preparedStatement.close();
			
			preparedStatement = connection.prepareStatement(getIdBeforeTransaction);
			resultSet = preparedStatement.executeQuery();
			while(resultSet.next()) {
				idBeforeGame = resultSet.getInt(1);
			}
			preparedStatement.close();
			
			Date date = new Date();
			Timestamp timestamp = new Timestamp(date.getTime());
			
			preparedStatement = connection.prepareStatement(makeTransaction);
			preparedStatement.setInt(1, idBeforeGame);
			preparedStatement.setString(2, senderAddr);
			preparedStatement.setString(3, senderPrivateAddr);
			preparedStatement.setString(4, receiverAddr);
			preparedStatement.setString(5, "0");
			preparedStatement.setTimestamp(6, timestamp);
			preparedStatement.setFloat(7, amount);
			preparedStatement.setInt(8, Node);
			preparedStatement.executeUpdate();
			preparedStatement.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
