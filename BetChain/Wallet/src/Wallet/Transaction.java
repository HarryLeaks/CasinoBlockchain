package Wallet;

import javafx.beans.property.SimpleFloatProperty;
import javafx.beans.property.SimpleStringProperty;

public class Transaction {
	private SimpleStringProperty SenderAddr;
    private SimpleStringProperty ReceiverAddr;
    private SimpleFloatProperty Amount;
    private SimpleStringProperty TimeStamp;
    
    public Transaction(String Sender, String Receiver, Float amount, String Timestamp) {
    	this.SenderAddr = new SimpleStringProperty(Sender);
    	this.ReceiverAddr = new SimpleStringProperty(Receiver);
    	this.Amount = new SimpleFloatProperty(amount);
    	this.TimeStamp = new SimpleStringProperty(Timestamp);
    }

	public String getSenderAddr() {
		return SenderAddr.get();
	}

	public String getReceiverAddr() {
		return ReceiverAddr.get();
	}

	public Float getAmount() {
		return Amount.get();
	}

	public String getTimeStamp() {
		return TimeStamp.get();
	}
    
    
}
