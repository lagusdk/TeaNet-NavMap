import random
from fastapi import APIRouter

router = APIRouter()

# 전공 로드맵 키워드 목록
major_keywords = [
    "알고리즘", "자료구조", "네트워크", "운영체제", "데이터베이스",
    "컴퓨터구조", "소프트웨어공학", "인공지능", "머신러닝", "웹프로그래밍"
]

@router.get("/coursemap/keywords")
def get_coursemap_keywords():
    """랜덤 전공 키워드 반환"""
    selected_keywords = random.sample(major_keywords, 3)
    return {"roadmap_type": "전공", "keywords": selected_keywords}
