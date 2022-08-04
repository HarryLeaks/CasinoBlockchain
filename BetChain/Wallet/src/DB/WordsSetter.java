package DB;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;

public class WordsSetter {
	private static final String set1 = "SET FOREIGN_KEY_CHECKS=0";
	private static final String sql = "INSERT INTO recoverywords "
			+ "(Word1, Word2, Word3, Word4, Word5, Word6, Word7, Word8, Word9, Word10, Word11, Word12, IdUtilizador) " 
			+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	private static final String set2 = "SET FOREIGN_KEY_CHECKS=1";
	
	Connection connection = null;
	PreparedStatement preparedStatement = null;
	int result;
	
	public WordsSetter(List<String> words, int IdUtilizador) {
		connection = ConnectionUtil.connectdb();
		
		try {
			preparedStatement = connection.prepareStatement(set1);
			result = preparedStatement.executeUpdate();
			preparedStatement.close();
			preparedStatement = connection.prepareStatement(sql);
			
			for(int i = 0; i < 12; i++) {
				preparedStatement.setString(i+1, words.get(i));
			}
			preparedStatement.setString(13, Integer.toString(IdUtilizador));
			
			result = preparedStatement.executeUpdate();
			preparedStatement.close();
			
			preparedStatement = connection.prepareStatement(set2);
			result = preparedStatement.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
