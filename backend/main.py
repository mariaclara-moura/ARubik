# backend/main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from solver import solve_from_string
from recognizer import recognize_from_image

app = FastAPI()

# Libera acesso do app frontend para essa API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ajuste para o domínio real em produção
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/solve")
def solve(data: dict):
    cube_string = data["cube_state"]
    solution = solve_from_string(cube_string)
    return {"solution": solution}

@app.post("/scan")
def scan_image(file: UploadFile = File(...)):
    image_bytes = file.file.read()
    cube_string = recognize_from_image(image_bytes)
    solution = solve_from_string(cube_string)
    return {"cube_state": cube_string, "solution": solution}
