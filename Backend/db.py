from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Member

DATABASE_URL = "sqlite:///./app.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def insert_member():
    session = SessionLocal()

    try:
        new_member = Member(
            student_id="2023204078",
            name="dasol",
            password="041015",
            department="Computer Science",
            major="Software Engineering"
        )
        
        session.add(new_member)
        
        session.commit()

        print("Member inserted successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")
        session.rollback()  # Roll back the transaction in case of error
    finally:
        session.close()  # Close the session

def init_db():
    # Create all tables defined in models.py
    Base.metadata.create_all(bind=engine)
    insert_member()
