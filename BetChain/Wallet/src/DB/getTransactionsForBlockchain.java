package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class getTransactionsForBlockchain {
	private static final String getTable = "SELECT SenderPublicAddress, SenderPrivateAddress, ReceiverPublicAddress, Amount, TimeStamp FROM transactions WHERE MinedTransaction = '0'";
	
	Connection connection = null;
	PreparedStatement preparedStatement = null;
	ResultSet resultSet;
	
	private ArrayList<String> SenderAddr = new ArrayList<String>();
	private ArrayList<String> SenderPvtAddr = new ArrayList<String>();
	private ArrayList<String> ReceiverAddr = new ArrayList<String>();
	private ArrayList<Float> Amount = new ArrayList<Float>();
	
	public getTransactionsForBlockchain() {
		connection = ConnectionUtil.connectdb();
		try {
			preparedStatement = connection.prepareStatement(getTable);
			resultSet = preparedStatement.executeQuery();
			while(resultSet.next()) {
				SenderAddr.add(resultSet.getString(1));
				SenderPvtAddr.add(resultSet.getString(2));
				ReceiverAddr.add(resultSet.getString(3));
				Amount.add(resultSet.getFloat(4));
			}
			preparedStatement.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public ArrayList<String> getSenderList() {
		return SenderAddr;
	}
	
	public ArrayList<String> getSenderPvtList(){
		return SenderPvtAddr;
	}
	
	public ArrayList<String> getReceiverList() {
		return ReceiverAddr;
	}
	
	public ArrayList<Float> getAmountList() {
		return Amount;
	}
}

