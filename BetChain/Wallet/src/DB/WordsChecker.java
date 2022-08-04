package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.TextField;

public class WordsChecker {
	private static final String sql = "SELECT IdUtilizador FROM recoverywords WHERE"
			+ " Word1 = ? "
			+ "and Word2 = ?"
			+ "and Word3 = ?"
			+ "and Word4 = ?"
			+ "and Word5 = ?"
			+ "and Word6 = ?"
			+ "and Word7 = ?"
			+ "and Word8 = ?"
			+ "and Word9 = ?"
			+ "and Word10 = ?"
			+ "and Word11 = ?"
			+ "and Word12 = ?";
	
	Connection connection = null;
	PreparedStatement preparedStatement = null;
	ResultSet resultSet = null;
	
	private boolean checker;
	private int IdUtilizador;
	
	public WordsChecker(TextField[] tfArray) throws SQLException {
		if(tfArray[0] != null) {
			connection = ConnectionUtil.connectdb();
			try {
				preparedStatement = connection.prepareStatement(sql);
				for(int i = 0; i < 12; i++) {
					preparedStatement.setString(i+1, tfArray[i].getText());
				}
				resultSet = preparedStatement.executeQuery();
				if(!resultSet.next()){
					infoBox("Words were not Found", "Failed", null);
				}else{
					infoBox("Words were Found", "Success", null);
					IdUtilizador = Integer.valueOf(resultSet.getString(1));
					checker = true;
				}
				preparedStatement.close();
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	public boolean getChecker() {
		return checker;
	}
	
	public int getIdUtilizador() {
		return IdUtilizador;
	}
	
	public static void infoBox(String infoMessage, String titleBar, String headerMessage)
	{
		Alert alert = new Alert(AlertType.INFORMATION);
		alert.setTitle(titleBar);
		alert.setHeaderText(headerMessage);
		alert.setContentText(infoMessage);
		alert.showAndWait();
	}
}
