from PIL import Image
from manga_ocr import MangaOcr
import time
import sys
from enhancer import enhance
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("API_GEMINI"))
model = genai.GenerativeModel("gemini-1.5-flash")


imageName = sys.argv[1]

print("Enhancing the image...")
status = enhance(imageName)

if status == False:
    print("Failed to enhance image")
    sys.exit()

img = Image.open(f'./img/enhancedImg/{imageName}.png')

mocr = MangaOcr()


print("extrating...")
text = mocr(img)

response = model.generate_content(f"This is the japanese text and you have to translate it into English, just give me the translation and nothing else {text}")
print(response.text)

with open('translation.txt', 'w', encoding='utf-8') as file1:
    file1.write(response.text)










