package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class login {
	private static final String sql = "SELECT IdUtilizador FROM utilizador WHERE PalavraPasse = ?";

	Connection connection = null;
	PreparedStatement preparedStatement = null;
	ResultSet resultSet = null;
	private boolean logged = false;
	private int IdUtilizador;
	
	public login(String pass) {
		connection = ConnectionUtil.connectdb();
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setString(1, pass);
			resultSet = preparedStatement.executeQuery();
			if(resultSet.next()) {
				IdUtilizador = resultSet.getInt(1);
				logged = true;
			}
			preparedStatement.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public boolean getLogged() {
		return logged;
	}
	
	public int getIdUtilizador() {
		return IdUtilizador;
	}
}
