from PIL import Image
from manga_ocr import MangaOcr
import time
import sys
from enhancer import enhance

imageName = sys.argv[1]

# print(imageName)
print("Enhancing the image...")
status = enhance(imageName)

if status == False:
    print("Failed to enhance image")
    sys.exit()

img = Image.open(f'./img/enhancedImg/{imageName}.png')

mocr = MangaOcr()

# start_time = time.time()
print("translating...")
text = mocr(img)
print("TEXT TYPE IS: ",type(text))

with open('translation.txt', 'w', encoding='utf-8') as file1:
    file1.write(text)


# print(text.encode('utf-8', 'replace').decode('utf-8'))
# print("--- %s seconds ---" % (time.time() - start_time))










