import kociemba

def solve_from_string(cube_string: str) -> str:
    try:
        solution = kociemba.solve(cube_string)
        return solution
    except Exception as e:
        return f"Erro ao resolver o cubo: {str(e)}"
