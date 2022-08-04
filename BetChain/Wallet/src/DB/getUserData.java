package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import Wallet.Home;

public class getUserData extends Home{
	private static final String sql="SELECT Nome, Idade, DataNascimento, Email, PalavraPasse, BetCoins, PrivateAddress, PublicAddress FROM utilizador WHERE IdUtilizador = ?";
	
	Connection connection = null;
	PreparedStatement preparedStatement = null;
	ResultSet resultSet = null;
	
	private String name;
	private int age;
	private String birthday;
	private String email;
	private String password;
	private float betCoins;
	private String privateAddr;
	private String publicAddr;
	
	public getUserData(int id) {
		connection = ConnectionUtil.connectdb();
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setString(1, Integer.toString(getId()));
			resultSet = preparedStatement.executeQuery();
			if(resultSet.next()) {
				name = resultSet.getString(1);
				age = resultSet.getInt(2);
				birthday = resultSet.getString(3);
				email = resultSet.getString(4);
				password = resultSet.getString(5);
				betCoins = resultSet.getFloat(6);
				privateAddr = resultSet.getString(7);
				publicAddr = resultSet.getString(8);
			}
			preparedStatement.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public String getName() {
		return name;
	}
	
	public int getAge() {
		return age;
	}
	
	public String getBirthday() {
		return birthday;
	}
	
	public String getEmail() {
		return email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public float getBetcoins() {
		return betCoins;
	}
	
	public String getPrivateAddr() {
		return privateAddr;
	}
	
	public String getPublicAddr() {
		return publicAddr;
	}
	
}
