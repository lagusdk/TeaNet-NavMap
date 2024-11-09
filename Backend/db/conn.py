import sqlite3

def get_db_connection():
    conn = sqlite3.connect("backend.db")
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Members table (회원정보 테이블)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS members (
        student_id VARCHAR(10) PRIMARY KEY,
        name VARCHAR(30),
        department VARCHAR(30),
        major VARCHAR(30)
    );
    """)

    # Courses table (전공 테이블)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS courses (
        course_id VARCHAR(20) PRIMARY KEY,
        course_name VARCHAR(50)
    );
    """)

    # Courses_Members Junction Table (전공 중간 테이블)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS course_members (
        student_id VARCHAR(10),
        course_id VARCHAR(20),
        FOREIGN KEY (student_id) REFERENCES members(student_id),
        FOREIGN KEY (course_id) REFERENCES courses(course_id)
    );
    """)

    # Interests table (관심사 키워드 테이블)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS interests (
        interest_id VARCHAR(10) PRIMARY KEY,
        interest_name VARCHAR(50)
    );
    """)

    # Career Interests Junction Table (진로 중간 테이블)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS career_interests (
        student_id VARCHAR(10),
        interest_id VARCHAR(10),
        FOREIGN KEY (student_id) REFERENCES members(student_id),
        FOREIGN KEY (interest_id) REFERENCES interests(interest_id)
    );
    """)

    conn.commit()
    conn.close()

# Run the function to create tables(테이블 생성 함수 호출)
create_tables()