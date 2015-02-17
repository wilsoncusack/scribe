import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import piccoloP5.*; 
import processing.serial.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class run_piccalo extends PApplet {





//Piccolo bed size in mm
PVector prevDrawPoint = new PVector(0,0);

boolean view3D = false; // display view in 3D


//Piccolo bed size in mm
float bedWidth = 50.0f; 
float bedHeight = 50.0f; 
float bedDepth = 50.0f; 
float bedRenderWidth = 300;

//current position of drawing command to send
float xPos = 0;          
float yPos = 0;      
float zPos = 0;  


PiccoloP5 piccolo;

public void setup() {
  size(300,300);  
  piccolo = new PiccoloP5(bedWidth,bedHeight,bedDepth);
  piccolo.serial = new Serial(this, Serial.list()[Serial.list().length-1]); //This selects the last COM port listed on your system, this is usually Piccolo but not always. 
  piccolo.serialConnected = true;
  piccolo.setStepRes(1f);
  piccolo.bezierDetail(20); 
  piccolo.rotate(PI/2.0f);
  //loop();


  PShape svg = loadShape("/home/pi/Desktop/scribe/use.svg"); //this is change
  svg.disableStyle();
  piccolo.beginDraw();
  piccolo.clear();
  piccolo.pushMatrix();

  float scaleSVG;

  if(true)
   scaleSVG = bedWidth / max(svg.width,svg.height);
  else
  scaleSVG = 0.16666666666667f;
  
  piccolo.translate(-(piccolo.bedWidth/2.0f),-(piccolo.bedHeight/2.0f),0.0f);

  piccolo.scale(scaleSVG);

  piccolo.shape(svg,0,0);
  piccolo.popMatrix();
  piccolo.endDraw();

  piccolo.start();//start drawing
}


public void draw(){
   piccolo.update(); //update piccolo
}
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "run_piccalo" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
