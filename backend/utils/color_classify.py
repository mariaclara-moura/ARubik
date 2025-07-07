import numpy as np

def classify_hsv_to_letter(hsv_pixel: np.ndarray) -> str:
    h, s, v = hsv_pixel

    if v > 200 and s < 40:
        return 'W'  # Branco
    elif 20 < h < 30:
        return 'Y'  # Amarelo
    elif h < 10 or h > 160:
        return 'R'  # Vermelho
    elif 10 <= h <= 20:
        return 'O'  # Laranja
    elif 40 <= h <= 90:
        return 'G'  # Verde
    elif 90 < h <= 130:
        return 'B'  # Azul
    else:
        return '?'
