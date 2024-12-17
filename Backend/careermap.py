import random
from fastapi import APIRouter

router = APIRouter()

# 진로 로드맵 키워드 목록
career_keywords = [
    "프론트엔드 개발자", "백엔드 개발자", "데이터 과학자", 
    "AI 연구원", "보안 전문가", "모바일 개발자", 
    "클라우드 엔지니어", "빅데이터 엔지니어", "UX/UI 디자이너", "게임 개발자"
]

@router.get("/careermap/keywords")
def get_careermap_keywords():
    """랜덤 진로 키워드 반환"""
    selected_keywords = random.sample(career_keywords, 3)
    return {"roadmap_type": "진로", "keywords": selected_keywords}
