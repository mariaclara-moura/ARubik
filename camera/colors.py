import cv2
import numpy as np

# Captura de vídeo pela webcam
cap = cv2.VideoCapture(0)

while True:
    ret, img = cap.read()
    if not ret:
        print("Falha ao capturar o frame")
        break

    # Conversão para HSV
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Definição das faixas de cores (HSV)
    color_ranges = {
        'Red':    ([167, 100, 100], [180, 255, 255]),
        'Blue':   ([97, 100, 100],  [103, 255, 255]),
        'Yellow': ([24, 100, 100],  [37, 255, 255]),
        'Green':  ([42, 100, 100],  [75, 255, 255]),
        'Orange': ([10, 100, 100],  [16, 250, 250]),
        'White':  ([0, 0, 200],     [180, 40, 255])
    }

    # Criação das máscaras para cada cor
    masks = {}
    for color, (lower, upper) in color_ranges.items():
        lower_np = np.array(lower, dtype=np.uint8)
        upper_np = np.array(upper, dtype=np.uint8)
        mask = cv2.inRange(hsv, lower_np, upper_np)
        mask = cv2.dilate(mask, np.ones((5, 5), "uint8"))
        masks[color] = mask

    # Desenho de contornos para visualização (opcional)
    for color, mask in masks.items():
        contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        for contour in contours:
            area = cv2.contourArea(contour)
            if area > 300:
                x, y, w, h = cv2.boundingRect(contour)
                cv2.rectangle(img, (x, y), (x+w, y+h), (255, 255, 255), 2)
                cv2.putText(img, color, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)

    # ------------------------------
    # Análise da face do cubo (3x3)
    # ------------------------------
    height, width, _ = img.shape
    roi_size = min(width, height) // 6
    start_x = (width - roi_size * 3) // 2
    start_y = (height - roi_size * 3) // 2

    face_colors = []

    for row in range(3):
        for col in range(3):
            x = start_x + col * roi_size
            y = start_y + row * roi_size
            roi = hsv[y:y+roi_size, x:x+roi_size]

            avg_color = np.mean(roi.reshape(-1, 3), axis=0).astype(int)
            h, s, v = avg_color

            # Identificação da cor
            color_name = "Unknown"
            if 167 <= h <= 180 and s >= 100 and v >= 100:
                color_name = "Red"
            elif 97 <= h <= 103 and s >= 100 and v >= 100:
                color_name = "Blue"
            elif 24 <= h <= 37 and s >= 100 and v >= 100:
                color_name = "Yellow"
            elif 42 <= h <= 75 and s >= 100 and v >= 100:
                color_name = "Green"
            elif 10 <= h <= 16 and s >= 100 and v >= 100:
                color_name = "Orange"
            elif v >= 200 and s <= 40:
                color_name = "White"

            face_colors.append(color_name)

            # Desenho no vídeo
            cv2.rectangle(img, (x, y), (x+roi_size, y+roi_size), (255, 255, 255), 2)
            cv2.putText(img, color_name, (x+5, y+20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1)

    # Impressão da face detectada no terminal
    print("Face do cubo:")
    if not all(c == "Unknown" for c in face_colors):
        for i in range(0, 9, 3):
            print(face_colors[i], face_colors[i+1], face_colors[i+2])

    # Exibição do vídeo com anotações
    cv2.imshow("Color Tracking", img)

    # Encerrar com ESC
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

# Liberação de recursos
cap.release()
cv2.destroyAllWindows()
