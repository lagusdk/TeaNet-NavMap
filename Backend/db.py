from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Member

DATABASE_URL = "sqlite:///./app.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    # Create all tables defined in models.py
    Base.metadata.create_all(bind=engine)

def recreate_db():
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)  # 모든 테이블 삭제
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)  # 모델에 따라 새 테이블 생성
    print("Database recreated successfully.")

def insert_member(student_id: str, name: str, department: str, major: str = None):
    session = SessionLocal()

    try:
        # 기존 사용자 확인
        existing_user = session.query(Member).filter(Member.student_id == student_id).first()
        if not existing_user:
            # 새 사용자 추가
            new_member = Member(
                student_id=student_id,
                name=name,
                department=department
            )
            session.add(new_member)
            session.commit()
            print(f"New member {student_id} added to the database.")
        else:
            print(f"Member {student_id} already exists in the database.")
    except Exception as e:
        print(f"An error occurred: {e}")
        session.rollback()
    finally:
        session.close()

def get_all_members():
    session = SessionLocal()
    try:
        members = session.query(Member).all()
        for member in members:
            print(f"Student ID: {member.student_id}, Name: {member.name}, Department: {member.department}, Major: {member.major}")
        return members
    except Exception as e:
        print(f"An error occurred while fetching members: {e}")
    finally:
        session.close()
