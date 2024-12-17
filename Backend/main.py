from fastapi import FastAPI, HTTPException, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from auth import router as auth_router
from db import SessionLocal, init_db
from models import Member
from config import Config
import logging
from pydantic import BaseModel
# from conversation import generate_keywords

# Initialize logging
logging.basicConfig(
    filename="app.log",
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

init_db()

class DBHelper:
    @staticmethod
    def get_session():
        return SessionLocal()

    @staticmethod
    def get_user(student_id: str, password: str):
        session = DBHelper.get_session()
        try:
            return session.query(Member).filter_by(student_id=student_id, password=password).first()
        finally:
            session.close()

class FieldRequest(BaseModel):
    field: str

app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key=Config.SECRET_KEY)

app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(auth_router, prefix="/api")

@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    user = request.session.get("user")
    if not user:
        return RedirectResponse("/static/login.html")
    with open("static/index.html", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

@app.post("/api/login", response_class=RedirectResponse)
def login(request: Request, id: str = Form(...), password: str = Form(...)):
    user = DBHelper.get_user(student_id=id, password=password)
    if user:
        request.session["user"] = user.name
        return RedirectResponse("/roadmap", status_code=303)  # 로그인 후 리다이렉트
    else:
        return JSONResponse({"success": False, "error": "Invalid credentials"}, status_code=400)

@app.get("/api/user", response_class=JSONResponse)
def get_user_session(request: Request):
    user = request.session.get("user")
    if not user:
        return JSONResponse({"loggedIn": False})
    return JSONResponse({"loggedIn": True, "user": user})

@app.post("/api/logout", response_class=JSONResponse)
def logout(request: Request):
    request.session.clear()
    return JSONResponse({"success": True})

# @app.post("/generate-keywords/")
# def generate_keywords_endpoint(request: FieldRequest):
    try:
        result = generate_keywords(request.field)
        return {"status": "success", "data": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    
from fastapi.responses import RedirectResponse

@app.get("/roadmap", response_class=HTMLResponse)
def roadmap_selection(request: Request):
    user = request.session.get("user")
    if not user:
        return RedirectResponse("/static/login.html")
    with open("static/roadmap_selection.html", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

if __name__ == "__main__":
    import uvicorn
    if Config.APP_ENV == "development":
        uvicorn.run("main:app", host="0.0.0.0", port=15450, reload=True)
    else:
        uvicorn.run("main:app", host="0.0.0.0", port=15450)
