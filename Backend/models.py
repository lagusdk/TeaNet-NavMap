from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

# Members table
class Member(Base):
    __tablename__ = "members"
    student_id = Column(String(10), primary_key=True, index=True)
    name = Column(String(30), nullable=True)
    department = Column(String(30), nullable=True)
    major = Column(String(30), nullable=True)

    courses = relationship("CourseMember", back_populates="member")
    career_interests = relationship("CareerInterest", back_populates="member")

# Courses table
class Course(Base):
    __tablename__ = "courses"
    course_id = Column(String(20), primary_key=True, index=True)
    course_name = Column(String(50), nullable=False)
    members = relationship("CourseMember", back_populates="course")

# Junction table: Course Members
class CourseMember(Base):
    __tablename__ = "course_members"
    student_id = Column(String(10), ForeignKey("members.student_id"), primary_key=True)
    course_id = Column(String(20), ForeignKey("courses.course_id"), primary_key=True)

    member = relationship("Member", back_populates="courses")
    course = relationship("Course", back_populates="members")

# Interests table
class Interest(Base):
    __tablename__ = "interests"
    interest_id = Column(String(10), primary_key=True, index=True)
    interest_name = Column(String(50), nullable=False)

    career_interests = relationship("CareerInterest", back_populates="interest")

# Junction table: Career Interests
class CareerInterest(Base):
    __tablename__ = "career_interests"
    student_id = Column(String(10), ForeignKey("members.student_id"), primary_key=True)
    interest_id = Column(String(10), ForeignKey("interests.interest_id"), primary_key=True)

    member = relationship("Member", back_populates="career_interests")
    interest = relationship("Interest", back_populates="career_interests")
