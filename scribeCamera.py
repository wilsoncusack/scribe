#!/usr/local/bin/python
import cv2
import matplotlib.pyplot as plt
import io
import requests

data = io.BytesIO()
with picamera.PiCamera() as camera: 
	camera.capture(data, format="jpeg")
data = np.fromstring(data.getvalue(), dtype=np.uint8)
image =  cv2.imdecode(data, 1)
image = image[0: 300, 0:300]	

#image = cv2.imread("/Users/wilsoncusack/Downloads/test-3.png") # the raw image
gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY) # convert to grayscale
ret,thresh = cv2.threshold(gray,120,255,cv2.THRESH_BINARY)
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
string = """<?xml version="1.0" standalone="no"?>
 <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> 
 <svg viewBox = "0 0 300 300" version = "1.1">"""

# for each contour (a list of X,Y points)
for i,c in enumerate(contours):
	if c.shape[0] > 10:
		path =  """<path d = "M """
		counter = 0

		numCords = len(c)
		z = 0
		while z < numCords:
			x, y = c[z][0]
			if (z + 1) < numCords:
				x2, y2 = c[z + 1][0]
				x = (x + x2)/2
				y = (y + y2)/2
			if counter == 0:
				path += str(x) + " "
				path += str(y)
				path += " "
				counter += 1
			else:
				path += "L " + str(x) + " "
				path += str(y)
				path += " "
			z = z + 2
			
		path += """ " fill = "none" stroke = "black" stroke-width = "3"/> """
		path += "\n"
		string += path	

# you'll want to delete contours that have only 1 point
string += "</svg>"
f = open("use1.svg", 'w')
f.write(string)
f.close()


r = requests.get('http://localhost:5000/newDrawing', params={'svg':string})

