import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    APP_ENV = os.getenv("APP_ENV", "development")
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
    KLAS_BASE_URL = "https://klas.kw.ac.kr"
