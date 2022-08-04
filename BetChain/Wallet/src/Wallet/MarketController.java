package Wallet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import javafx.application.Platform;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.chart.PieChart;
import javafx.scene.control.Label;

public class MarketController{
	@FXML
	private Label btc, avax, doge, bnb, sol, cardano, dot, matic, shiba, tron, eth, xrp, cryptos, exchanges, marketcap, volume;
	
	@FXML private PieChart pieChart;
	
	@FXML 
	public void initialize() throws IOException {
		URL url = new URL("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");		
		URL url2 = new URL("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT");		
		URL url3 = new URL("https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT");
		URL url4 = new URL("https://api.binance.com/api/v3/ticker/price?symbol=ADAUSDT");
		URL url5 = new URL("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT");		
		URL url6 = new URL("https://api.binance.com/api/v3/ticker/price?symbol=XRPUSDT");		
		URL url7 = new URL("https://api.binance.com/api/v3/ticker/price?symbol=DOGEUSDT");		
		URL url8 = new URL("https://api.binance.com/api/v3/ticker/price?symbol=DOTUSDT");		
		URL url9 = new URL("https://api.binance.com/api/v3/ticker/price?symbol=AVAXUSDT");		
		URL url10 = new URL("https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT");		
		URL url11 = new URL("https://api.binance.com/api/v3/ticker/price?symbol=TRXUSDT");	
		URL url12 = new URL("https://api.binance.com/api/v3/ticker/price?symbol=SHIBUSDT");
		
		Timer timer = new Timer();
		Thread t = new Thread() {
		    public void run() {
		    	timer.scheduleAtFixedRate(new TimerTask() {
			        @Override
			        public void run() {
			        	Platform.runLater(() -> {
				        	try {				 
				        		URLConnection yc = url.openConnection();
				        		URLConnection yc2 = url2.openConnection();
				        		URLConnection yc3 = url3.openConnection();
				        		URLConnection yc4 = url4.openConnection();
				        		URLConnection yc5 = url5.openConnection();
				        		URLConnection yc6 = url6.openConnection();
				        		URLConnection yc7 = url7.openConnection();
				        		URLConnection yc8 = url8.openConnection();
				        		URLConnection yc9 = url9.openConnection();
				        		URLConnection yc10 = url10.openConnection();
				        		URLConnection yc11 = url11.openConnection();
				        		URLConnection yc12 = url12.openConnection();

					    		BufferedReader in = new BufferedReader(
					    				new InputStreamReader(
					    						yc.getInputStream()
					    				)
					    		);
					    		
					    		BufferedReader in2 = new BufferedReader(
					    				new InputStreamReader(
					    						yc2.getInputStream()
					    				)
					    		);
					    		
					    		BufferedReader in3 = new BufferedReader(
					    				new InputStreamReader(
					    						yc3.getInputStream()
					    				)
					    		);
					    		
					    		BufferedReader in4 = new BufferedReader(
					    				new InputStreamReader(
					    						yc4.getInputStream()
					    				)
					    		);
					    		
					    		BufferedReader in5 = new BufferedReader(
					    				new InputStreamReader(
					    						yc5.getInputStream()
					    				)
					    		);
					    		
					    		BufferedReader in6 = new BufferedReader(
					    				new InputStreamReader(
					    						yc6.getInputStream()
					    				)
					    		);
					    		
					    		BufferedReader in7 = new BufferedReader(
					    				new InputStreamReader(
					    						yc7.getInputStream()
					    				)
					    		);
					    		
					    		BufferedReader in8 = new BufferedReader(
					    				new InputStreamReader(
					    						yc8.getInputStream()
					    				)
					    		);
					    		
					    		BufferedReader in9 = new BufferedReader(
					    				new InputStreamReader(
					    						yc9.getInputStream()
					    				)
					    		);
					    		
					    		BufferedReader in10 = new BufferedReader(
					    				new InputStreamReader(
					    						yc10.getInputStream()
					    				)
					    		);
					    		
					    		BufferedReader in11 = new BufferedReader(
					    				new InputStreamReader(
					    						yc11.getInputStream()
					    				)
					    		);
					    		
					    		BufferedReader in12 = new BufferedReader(
					    				new InputStreamReader(
					    						yc12.getInputStream()
					    				)
					    		);
					    		
					    		String inputLine;
					    		String[] stringarray = null;
					    		String string;
					    		while((inputLine = in.readLine()) != null)
					    			stringarray = inputLine.split(":");
					    			string = stringarray[2].substring(1);
					    			string= method(method(string));
					    			btc.setText(string);
					    		while((inputLine = in2.readLine()) != null)
					    			stringarray = inputLine.split(":");
					    			string = stringarray[2].substring(1);
					    			string= method(method(string));
					    			eth.setText(string);
					    		while((inputLine = in3.readLine()) != null)
					    			stringarray = inputLine.split(":");
					    			string = stringarray[2].substring(1);
					    			string= method(method(string));
					    			sol.setText(string);
					    		while((inputLine = in4.readLine()) != null)
					    			stringarray = inputLine.split(":");
					    			string = stringarray[2].substring(1);
					    			string= method(method(string));
					    			cardano.setText(string);
					    		while((inputLine = in5.readLine()) != null)
					    			stringarray = inputLine.split(":");
					    			string = stringarray[2].substring(1);
					    			string= method(method(string));
					    			bnb.setText(string);
					    		while((inputLine = in6.readLine()) != null)
					    			stringarray = inputLine.split(":");
					    			string = stringarray[2].substring(1);
					    			string= method(method(string));
					    			xrp.setText(string);
					    		while((inputLine = in7.readLine()) != null)
					    			stringarray = inputLine.split(":");
					    			string = stringarray[2].substring(1);
					    			string= method(method(string));
					    			doge.setText(string);
					    		while((inputLine = in8.readLine()) != null)
					    			stringarray = inputLine.split(":");
					    			string = stringarray[2].substring(1);
					    			string= method(method(string));
					    			dot.setText(string);
					    		while((inputLine = in9.readLine()) != null)
					    			stringarray = inputLine.split(":");
					    			string = stringarray[2].substring(1);
					    			string= method(method(string));
					    			avax.setText(string);
					    		while((inputLine = in10.readLine()) != null)
					    			stringarray = inputLine.split(":");
					    			string = stringarray[2].substring(1);
					    			string= method(method(string));
					    			matic.setText(string);
					    		while((inputLine = in11.readLine()) != null)
					    			stringarray = inputLine.split(":");
					    			string = stringarray[2].substring(1);
					    			string= method(method(string));
					    			tron.setText(string);
					    		while((inputLine = in12.readLine()) != null)
					    			stringarray = inputLine.split(":");
					    			string = stringarray[2].substring(1);
					    			string= method(method(string)); 
					    			shiba.setText(string);
				        	}catch(Exception e) {
				        		e.printStackTrace();
				        	}
				        });
			        }
			    }, 0, 7000);
		    }
		};
		t.start();
			
		Document d = Jsoup.connect("https://coinmarketcap.com/").timeout(6000).get();
		Elements ele = d.select("div.cmc-global-stats__inner-content");
		List<String> s = new ArrayList<String>();
		for(Element element : ele.select("span")) {
			s.add(element.select("a.cmc-link").text());
		}
		
		cryptos.setText(s.get(0));
		exchanges.setText(s.get(1));
		marketcap.setText(s.get(2));
		volume.setText(s.get(3));
		
		String[] str = s.get(4).split(":");
		str[1] = str[1].replaceAll("[^0-9.]", "");
		str[2] = str[2].replaceAll("[^0-9.]", "");
		ObservableList<PieChart.Data> pieChartData =
                FXCollections.observableArrayList(
                new PieChart.Data("BTC", Float.parseFloat(str[1])),
                new PieChart.Data("ETH", Float.parseFloat(str[2])),
                new PieChart.Data("Other", (100-(Float.parseFloat(str[1])+Float.parseFloat(str[2])))));
		pieChart.setData(pieChartData);
	}
	public String method(String s) {
	    if (s == null || s.length() == 0) {
	        return s;
	    }
	    return s.substring(0, s.length()-1);
	}
}
