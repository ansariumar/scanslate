
from PIL import Image
# import cv2
# import numpy as np
from manga_ocr import MangaOcr
import time
from enhancer import status



img = Image.open('./img/enhancedImg/img.png')

mocr = MangaOcr()

start_time = time.time()
text = mocr(img)
print("--- %s seconds ---" % (time.time() - start_time))

print(text)
















# PYTESSERACT
# import pytesseract
# pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'
# # Extract vertical Japanese text
# custom_config = r'--psm 5 -c writing_direction=1'

# print(text)


