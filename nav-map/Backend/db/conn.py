import sqlite3

def get_db_connection():
    conn = sqlite3.connect("backend.db")
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS <테이블 이름> (
        id VARCHAR(30) PRIMARY KEY,
        created TIMESTAMP DEFAULT CURRENT_TIME_STAMP,
        name VARCHAR(30)
    );
    """)
    conn.commit()
    conn.close()