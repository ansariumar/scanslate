from PIL import Image
import cv2
from cv2 import dnn_superres
import numpy as np
import time

image = cv2.imread('./img/frfr.png')


# #----------------CV2 Enhancer------------------------------
def enhancer(image):
    brightness = 0.5
    constrast = 1.1

    enhanced_image = cv2.addWeighted(image, constrast, np.zeros(image.shape, image.dtype), 0, brightness)

    return enhanced_image

def binarize(image):
    grayscale = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
    binary_image = cv2.adaptiveThreshold(grayscale, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
    return binary_image

def denoise(image):
    denoised_image = cv2.fastNlMeansDenoisingColored(image, None, 10, 10, 7, 21)
    return denoised_image

def sharpen(image):
    kernel = np.array([[0, -1, 0],
                       [-1, 5,-1],
                       [0, -1, 0]])
    sharpened_image = cv2.filter2D(image, -1, kernel)
    return sharpened_image

def dilate(image):
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
    dilated_image = cv2.dilate(image, kernel, iterations=1)
    return dilated_image
# #----------------------cv2 End-----------------------------


# #----------------------CV2 UPSCALER-----------------------------
def upscaler(image):
    sr = dnn_superres.DnnSuperResImpl_create()
    sr.readModel('./upscaleModel/EDSR_x3.pb')

    if len(image.shape) == 2:  # Grayscale or binary image
        image = cv2.cvtColor(image, cv2.COLOR_GRAY2BGR)
    
    sr.setModel('edsr', 2)
    upscaled_image = sr.upsample(image)

    return upscaled_image
# #----------------------CV2 end-----------------------------


start_time = time.time()

finalImage = enhancer(sharpen((binarize(denoise(image)))))  #returns numpy.ndarray

print("--- %s seconds ---" % (time.time() - start_time))

status = cv2.imwrite("./img/enhancedImg/img.png", finalImage)

# cv2.imshow("Best image V@", finalImage)

# cv2.waitKey(0)















# def upscalerGPU(image):
#     sr = dnn_superres.DnnSuperResImpl_create()
#     sr.readModel('EDSR_x3.pb')

#     sr.setModel('edsr', 2)

#     sr.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
#     sr.setPreferableBackend(cv2.dnn.DNN_TARGET_CUDA)

#     upscaled_image = sr.upsample(image)

#     return upscaled_image