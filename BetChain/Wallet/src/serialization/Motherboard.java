package serialization;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStreamReader;

public class Motherboard {
	public static String getWindowsMotherBoardSerialNumber() {
		 String result = "";
	        try {
	            File file = File.createTempFile("realhowto",".vbs");
	            file.deleteOnExit();
	            FileWriter fw = new java.io.FileWriter(file);

	            String vbs =
	            "Set objWMIService = GetObject(\"winmgmts:\\\\.\\root\\cimv2\")\n"
	              + "Set colItems = objWMIService.ExecQuery _ \n"
	              + "   (\"Select * from Win32_BaseBoard\") \n"
	              + "For Each objItem in colItems \n"
	              + "    Wscript.Echo objItem.SerialNumber \n"
	              + "    exit for  ' do the first cpu only! \n"
	              + "Next \n";

	            fw.write(vbs);
	            fw.close();

	            Process p = Runtime.getRuntime().exec("cscript //NoLogo " + file.getPath());
	            BufferedReader input = new BufferedReader(new InputStreamReader(p.getInputStream()));
	            String line;
	            while ((line = input.readLine()) != null) {
	               result += line;
	            }
	            input.close();
	        }
	        catch(Exception E){
	             System.err.println("Windows MotherBoard Exp : "+E.getMessage());
	        }
	        return result.trim();
	}
}
