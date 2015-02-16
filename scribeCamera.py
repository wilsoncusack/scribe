#!/usr/local/bin/python
import cv2
import matplotlib.pyplot as plt
import io
import psycopg2
import requests

# data = io.BytesIO()
# with picamera.PiCamera() as camera: 
# 	camera.camputre(data, format="jpeg")
# data = np.fromstring(data.getvalue(), dtype=np.uint8)
# image =  cv2.imdecode(data, 1)
#image = image[0: 300, 0:300]	

image = cv2.imread("/Users/wilsoncusack/Downloads/test.png") # the raw image
gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY) # convert to grayscale
ret,thresh = cv2.threshold(gray,127,255,cv2.THRESH_BINARY)
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
string = """<?xml version="1.0" standalone="no"?>
 <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> 
 <svg viewBox = "0 0 1100 400" version = "1.1">"""

# for each contour (a list of X,Y points)
for i,c in enumerate(contours):
	print(i)
	if c.shape[0] > 2:
		path =  """<polygon fill="none" stroke="#000000" stroke-miterlimit="10" points=" """ 
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
				path += ", "
				counter += 1
			else:
				path += str(x) + " "
				path += str(y)
				path += ", "
			z = z + 2
			
		path += """ " /> """
		path += "\n"
		string += path
	i = i + 2
		

# you'll want to delete contours that have only 1 point
string += "</svg>"
f = open("test.svg", 'w')
f.write(string)
f.close()


r = requests.get('http://localhost:5000/newDrawing')


# <?xml version="1.0" standalone="no"?>
# <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> 
# <svg viewBox = "0 0 1100 400" version = "1.1">
#     <path id = "s3" d = "M 60 0 L 120 0 L 180 60 L 180 120 L 120 180 L 60 180 L 0 120 L 0 60" fill = "green" stroke = "black" stroke-width = "3"/>
# </svg>
