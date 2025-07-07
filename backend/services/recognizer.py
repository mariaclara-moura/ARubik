import cv2
import numpy as np
from utils.color_classify import classify_hsv_to_letter

def recognize_from_image(image_bytes: bytes) -> str:
    # Decodificar imagem
    np_arr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (400, 400))

    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Detectar quadrados usando contornos
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edged = cv2.Canny(blurred, 50, 150)
    contours, _ = cv2.findContours(edged, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    squares = []
    for cnt in contours:
        approx = cv2.approxPolyDP(cnt, 0.1 * cv2.arcLength(cnt, True), True)
        if len(approx) == 4 and cv2.isContourConvex(approx):
            area = cv2.contourArea(approx)
            if 1000 < area < 10000:
                squares.append(approx)

    if len(squares) < 9:
        return '?' * 9

    # Ordenar os 9 quadrados detectados da esquerda para direita, de cima para baixo
    squares = sorted(squares, key=lambda c: cv2.boundingRect(c)[1]*10 + cv2.boundingRect(c)[0])
    squares = squares[:9]

    face_colors = []
    for square in squares:
        mask = np.zeros(hsv.shape[:2], dtype=np.uint8)
        cv2.drawContours(mask, [square], -1, 255, -1)
        mean = cv2.mean(hsv, mask=mask)
        hsv_mean = np.array(mean[:3], dtype=np.uint8)
        color_letter = classify_hsv_to_letter(hsv_mean)
        face_colors.append(color_letter)

    return ''.join(face_colors)
