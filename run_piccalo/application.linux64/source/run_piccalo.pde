import piccoloP5.*;
import processing.serial.*;


//Piccolo bed size in mm
PVector prevDrawPoint = new PVector(0,0);

boolean view3D = false; // display view in 3D


//Piccolo bed size in mm
float bedWidth = 50.0; 
float bedHeight = 50.0; 
float bedDepth = 50.0; 
float bedRenderWidth = 300;

//current position of drawing command to send
float xPos = 0;          
float yPos = 0;      
float zPos = 0;  


PiccoloP5 piccolo;

void setup() {
  size(300,300);  
  piccolo = new PiccoloP5(bedWidth,bedHeight,bedDepth);
  piccolo.serial = new Serial(this, Serial.list()[Serial.list().length-1]); //This selects the last COM port listed on your system, this is usually Piccolo but not always. 
  piccolo.serialConnected = true;
  piccolo.setStepRes(1f);
  piccolo.bezierDetail(20); 
  piccolo.rotate(PI/2.0f);
  //loop();


  PShape svg = loadShape("/Users/wilsoncusack/Desktop/Desktop/github/scribe/use.svg"); //this is change
  svg.disableStyle();
  piccolo.beginDraw();
  piccolo.clear();
  piccolo.pushMatrix();

  float scaleSVG;

  if(true)
   scaleSVG = bedWidth / max(svg.width,svg.height);
  else
  scaleSVG = 0.16666666666667;
  
  piccolo.translate(-(piccolo.bedWidth/2.0),-(piccolo.bedHeight/2.0),0.0);

  piccolo.scale(scaleSVG);

  piccolo.shape(svg,0,0);
  piccolo.popMatrix();
  piccolo.endDraw();

  piccolo.start();//start drawing
}


void draw(){
   piccolo.update(); //update piccolo
}
