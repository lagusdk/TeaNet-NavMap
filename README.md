# TeaNet-NavMap

2024(2) 광운학습모임 TeaNet

프론트엔드: 라현아, 유아름, 이은송, 장윤선, 전서연
백엔드: 김다솔, 이하랑, 최은비

## FrontEnd 폴더 구조

components - 자주 사용하는 컴포넌트(헤더, 사이드바, 모달 등) 페이지

pages - 앞으로 만들게 될 페이지들 여기 아래에 추가하기

css - css 파일 분리하는 폴더, css 파일은 되도록 js 파일과 동일한 이름으로 생성하기 (예: main.js > main.css)

img - 사용될 이미지 저장하는 폴더

App.js, index.js들은 건드리지 말기

## BackEnd

### 실행
cd Backend
uvicorn main:app --reload

### 의존성
fastapi
uvicorn
itsdangerous
sqlalchemy
python-dotenv
python-multipart
httpx
pycryptodome
.
.
.

requirements.text 로 설치 
-> pip install -r requirements.text

!! python 3.9 ~ 3.12 버전 사용 !! 