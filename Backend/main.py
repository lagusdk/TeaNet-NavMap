from fastapi import FastAPI, HTTPException, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from db import SessionLocal, init_db
from models import User
from config import Config
import logging

# Initialize logging
logging.basicConfig(
    filename="app.log",
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

# Initialize database
init_db()

# Helper class for database operations
class DBHelper:
    @staticmethod
    def get_session():
        return SessionLocal()

    @staticmethod
    def get_user(id: str, password: str):
        session = DBHelper.get_session()
        try:
            return session.query(User).filter_by(id=id, password=password).first()
        finally:
            session.close()

    @staticmethod
    def create_default_user():
        session = DBHelper.get_session()
        try:
            default_user = session.query(User).filter_by(id="2023204078").first()
            if not default_user:
                default_user = User(id="2023204078", password="041015", name="dasol")
                session.add(default_user)
                session.commit()
        finally:
            session.close()

# Insert default user
DBHelper.create_default_user()

# FastAPI app
app = FastAPI()

# Add session middleware
app.add_middleware(SessionMiddleware, secret_key=Config.SECRET_KEY)

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Routes
@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    user = request.session.get("user")
    if not user:
        return RedirectResponse("/static/login.html")
    with open("static/index.html", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

@app.post("/api/login", response_class=JSONResponse)
def login(request: Request, id: str = Form(...), password: str = Form(...)):
    user = DBHelper.get_user(id=id, password=password)
    if user:
        request.session["user"] = user.name
        return JSONResponse({"success": True})
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

if __name__ == "__main__":
    import uvicorn
    if Config.APP_ENV == "development":
        uvicorn.run("main:app", host="0.0.0.0", port=15450, reload=True)
    else:
        uvicorn.run("main:app", host="0.0.0.0", port=15450)
