package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Register {
	private static final String sql = "INSERT INTO Utilizador "
			+ "(Nome, Idade, DataNascimento, Email, PalavraPasse, Betcoins, PrivateAddress, PublicAddress) "
			+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
	
	private static final String sql2 = "SELECT IdUtilizador FROM Utilizador WHERE"
			+ " Nome = ? AND"
			+ " Idade = ? AND"
			+ " DataNascimento = ? AND"
			+ " Email = ? AND"
			+ " PalavraPasse = ? AND"
			+ " BetCoins = ? AND"
			+ " PrivateAddress = ? AND"
			+ " PublicAddress =  ?";
	
	Connection connection = null;
	PreparedStatement preparedStatement = null;
	int resultSet;
	ResultSet resultSet2;
	
	private int IdUtilizador;
	
	public Register(String Nome, String Idade, String Password, String Email, String DataNascimento, String PrivateAdd, String PublicAdd) {
		connection = ConnectionUtil.connectdb();
		
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setString(1, Nome);
			preparedStatement.setString(2, Idade);
			preparedStatement.setString(3, DataNascimento);
			preparedStatement.setString(4, Email);
			preparedStatement.setString(5, Password);
			preparedStatement.setString(6, "0");
			preparedStatement.setString(7, PrivateAdd);
			preparedStatement.setString(8, PublicAdd);
			resultSet = preparedStatement.executeUpdate();
			preparedStatement.close();
			
			preparedStatement = connection.prepareStatement(sql2);
			preparedStatement.setString(1, Nome);
			preparedStatement.setString(2, Idade);
			preparedStatement.setString(3, DataNascimento);
			preparedStatement.setString(4, Email);
			preparedStatement.setString(5, Password);
			preparedStatement.setString(6, "0");
			preparedStatement.setString(7, PrivateAdd);
			preparedStatement.setString(8, PublicAdd);
			resultSet2 = preparedStatement.executeQuery();
			resultSet2.next();
			IdUtilizador = resultSet2.getInt(1);
			preparedStatement.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public int getResult() {
		return resultSet;
	}
	
	public int getIdUtilizador() {
		return IdUtilizador;
	}
}
