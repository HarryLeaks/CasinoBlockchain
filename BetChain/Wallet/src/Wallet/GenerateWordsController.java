package Wallet;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import DB.WordsSetter;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.input.MouseEvent;
import javafx.stage.Stage;

public class GenerateWordsController extends CreateNewWalletController{
	@FXML private Button Continue, exit;
	@FXML private Label lb1, lb2, lb3, lb4, lb5, lb6, lb7, lb8, lb9, lb10, lb11, lb12;
	private Label lbArray[] = new Label[13]; 
	
	private double xOffset = 0;
	private double yOffset = 0;
	
	@FXML
    public void initialize() throws NoSuchAlgorithmException{
		List<String> words = generateRandomWords();
		lb1.setText(words.get(0));
		lb2.setText(words.get(1));
		lb3.setText(words.get(2));
		lb4.setText(words.get(3));
		lb5.setText(words.get(4));
		lb6.setText(words.get(5));
		lb7.setText(words.get(6));
		lb8.setText(words.get(7));
		lb9.setText(words.get(8));
		lb10.setText(words.get(9));
		lb11.setText(words.get(10));
		lb12.setText(words.get(11));
		
		lbArray[0] = lb1;
		lbArray[1] = lb2;
		lbArray[2] = lb3;
		lbArray[3] = lb4;
		lbArray[4] = lb5;
		lbArray[5] = lb6;
		lbArray[6] = lb7;
		lbArray[7] = lb8;
		lbArray[8] = lb9;
		lbArray[9] = lb10;
		lbArray[10] = lb11;
		lbArray[11] = lb12;
		
		@SuppressWarnings("unused")
		WordsSetter ws = new WordsSetter(words, getIdUtilizador());
	}
	
	public List<String> generateRandomWords() throws NoSuchAlgorithmException
	{
		SecureRandom random = new SecureRandom();
		byte bytes[] = new byte[16];
		random.nextBytes(bytes);
		
		String m = Bip39.getMnemonic(bytes);
		
		List<String> str = Arrays.stream(m.split(" ")).map(String::trim).collect(Collectors.toList());
		return str;
	}

	@FXML
	private void exit(ActionEvent event) {
		System.exit(0);
	}
	
	@FXML
	private void Continue(ActionEvent event) throws IOException {
		Home h = new Home();
		h.setId(getIdUtilizador());
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
