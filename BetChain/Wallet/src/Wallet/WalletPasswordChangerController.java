package Wallet;

import java.io.IOException;
import java.sql.SQLException;

import DB.IDMemorie;
import DB.PassChanger;
import DB.updatePass;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.input.MouseEvent;
import javafx.stage.Stage;
import serialization.Motherboard;

public class WalletPasswordChangerController extends ImportWalletController{
	private static int IdUtilizador;
	
	@FXML private Button exit, changePassword;
	@FXML private PasswordField pass, confPass;
	
	private double xOffset = 0;
	private double yOffset = 0;
	
	private PassChanger passChangerObj;
	
	private Stage stage;
	private Scene scene;
	private Parent root;
	
	public WalletPasswordChangerController() {
		IdUtilizador = getUtilizador();
	}
	
	@FXML
	private void close(ActionEvent event) throws IOException {
		FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("ImportWallet.fxml"));
		root = fxmlLoader.load();
		stage = (Stage)((Node)event.getSource()).getScene().getWindow();
		scene = new Scene(root);
		stage.setScene(scene);
		
		root.setOnMousePressed(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent event) {
                xOffset = stage.getX() - event.getScreenX();
                yOffset = stage.getY() - event.getScreenY();
            }
        });
		
		root.setOnMouseDragged(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent event) {
                stage.setX(event.getScreenX() + xOffset);
                stage.setY(event.getScreenY() + yOffset);
            }
        });
		
		stage.show();
	}
	
	@FXML 
	private void changePassword(ActionEvent event) throws IOException, SQLException {
		if(pass.getText().toString().equals(confPass.getText().toString())) {
			passChangerObj = new PassChanger(pass.getText().toString(), IdUtilizador);
			if(passChangerObj.getChecker()) {
				String MotherBoardID = Motherboard.getWindowsMotherBoardSerialNumber();
				new IDMemorie(MotherBoardID, pass.getText(), IdUtilizador);
				new updatePass(pass.getText(), IdUtilizador);
				new Home().setId(IdUtilizador);
				FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("Home.fxml"));
				Parent root = fxmlLoader.load();
				Stage stage = (Stage)((Node)event.getSource()).getScene().getWindow();
				Scene scene = new Scene(root);
				stage.setScene(scene);
				
				root.setOnMousePressed(new EventHandler<MouseEvent>() {
		            @Override
		            public void handle(MouseEvent event) {
		                xOffset = stage.getX() - event.getScreenX();
		                yOffset = stage.getY() - event.getScreenY();
		            }
		        });
				
				root.setOnMouseDragged(new EventHandler<MouseEvent>() {
		            @Override
		            public void handle(MouseEvent event) {
		                stage.setX(event.getScreenX() + xOffset);
		                stage.setY(event.getScreenY() + yOffset);
		            }
		        });
				
				stage.show();
			}
		}
	}
}

