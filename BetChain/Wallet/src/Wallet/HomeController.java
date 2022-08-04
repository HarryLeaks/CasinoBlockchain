package Wallet;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.layout.StackPane;

public class HomeController extends Home implements Initializable{
	@FXML private StackPane contentPane;
	
	boolean isMarket = false;
	
	@Override
	public void initialize(URL arg0, ResourceBundle arg1) {
		Parent fxml = null;
		try {
			fxml = FXMLLoader.load(getClass().getResource("Portfolio.fxml"));
			contentPane.getChildren().removeAll();
			contentPane.getChildren().setAll(fxml);
			isMarket = false;
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@FXML
	public void exit(ActionEvent event) {
		System.exit(0);
	}
	
	@FXML
	public void portfolio(ActionEvent event) throws IOException{
		Parent fxml = FXMLLoader.load(getClass().getResource("Portfolio.fxml"));
		contentPane.getChildren().removeAll();
		contentPane.getChildren().setAll(fxml);
		isMarket = false;
	}
	
	@FXML
	public void reward(ActionEvent event) throws IOException{
		Parent fxml = FXMLLoader.load(getClass().getResource("MineReward.fxml"));
		contentPane.getChildren().removeAll();
		contentPane.getChildren().setAll(fxml);
		isMarket = false;
	}
	
	@FXML
	public void market(ActionEvent event) throws IOException{
		Parent fxml = FXMLLoader.load(getClass().getResource("Market.fxml"));
		contentPane.getChildren().removeAll();
		contentPane.getChildren().setAll(fxml);
	}
}
