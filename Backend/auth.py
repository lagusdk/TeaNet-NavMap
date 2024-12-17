import httpx, json, base64
from fastapi import APIRouter, Form, Request
from fastapi.responses import JSONResponse
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
from bs4 import BeautifulSoup
from db import SessionLocal, insert_member
from models import Member
from sqlalchemy.exc import SQLAlchemyError

router = APIRouter()

# RSA 공개키를 PEM 형식으로 변환
def format_public_key(public_key: str) -> str:
    return (
        "-----BEGIN PUBLIC KEY-----\n"
        + "\n".join([public_key[i:i+64] for i in range(0, len(public_key), 64)])
        + "\n-----END PUBLIC KEY-----"
    )

# 공개키 가져오기
async def get_public_key(client):
    url = "https://klas.kw.ac.kr/usr/cmn/login/LoginSecurity.do"
    response = await client.post(url)
    response_json = response.json()
    raw_public_key = response_json.get("publicKey")
    if not raw_public_key:
        raise Exception("Failed to retrieve public key.")
    formatted_public_key = format_public_key(raw_public_key)
    return formatted_public_key

# 로그인 데이터를 암호화
def encrypt_login_data(public_key: str, login_data: dict) -> str:
    rsa_key = RSA.importKey(public_key)
    cipher = PKCS1_v1_5.new(rsa_key)
    login_json = json.dumps(login_data, separators=(',', ':'))  # 공백 없이 직렬화
    encrypted_data = cipher.encrypt(login_json.encode('utf-8'))
    return base64.b64encode(encrypted_data).decode('utf-8')

# KLAS 로그인 함수
async def klas_login(student_id: str, password: str):
    try:
        async with httpx.AsyncClient() as client:
            # Step 1: 초기 GET 요청으로 세션 쿠키 획득
            init_url = "https://klas.kw.ac.kr/usr/cmn/login/LoginForm.do"
            await client.get(init_url)

            # Step 2: 공개키 획득
            public_key = await get_public_key(client)

            # Step 3: 로그인 데이터 준비 및 암호화
            login_data = {
                "loginId": student_id,
                "loginPwd": password,
                "storeIdYn": "N",
            }
            encrypted_login_data = encrypt_login_data(public_key, login_data)

            # Step 4: 로그인 요청 전송
            login_url = "https://klas.kw.ac.kr/usr/cmn/login/LoginConfirm.do"
            payload = {
                "loginToken": encrypted_login_data,
                "redirectTabUrl": "",
                "redirectUrl": "",
            }
            headers = {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "*/*",
                "Referer": "https://klas.kw.ac.kr/usr/cmn/login/LoginForm.do",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Origin": "https://klas.kw.ac.kr",
                "X-Requested-With": "XMLHttpRequest",
            }

            response = await client.post(login_url, json=payload, headers=headers)

            # Step 5: 로그인 성공 여부 확인
            if response.status_code == 200:
                response_json = response.json()
                if response_json.get("errorCount") == 0:
                    print("Klas Login Successful")

                    # Step 6: 사용자 정보 페이지 요청
                    info_url = "https://klas.kw.ac.kr/std/lis/evltn/LrnSttusStdPage.do"
                    info_response = await client.get(info_url)

                    if info_response.status_code == 200:
                        soup = BeautifulSoup(info_response.text, "html.parser")

                        # HTML 파싱: 이름, 학과, 학번 추출
                        department = soup.find("td", string="소속").find_next_sibling("td").text.strip()
                        student_id_extracted = soup.find("td", string="학번").find_next_sibling("td").text.strip()
                        user_name = soup.find("td", string="이름").find_next_sibling("td").text.strip()

                        return {
                            "status": "success",
                            "student_id": student_id_extracted,
                            "name": user_name,
                            "department": department,
                            "redirectUrl": response_json.get("redirectUrl")
                        }
                    else:
                        return {"status": "fail", "message": "Failed to fetch user information"}

                else:
                    error_message = response_json.get("fieldErrors")[0].get("message")
                    return {"status": "fail", "message": error_message}
            else:
                return {"status": "fail", "message": f"Login failed with status code {response.status_code}"}

    except Exception as e:
        print("Unhandled Exception:", str(e))
        return {"status": "fail", "message": str(e)}

    except Exception as e:
        print("Unhandled Exception:", str(e))
        return {"status": "fail", "message": str(e)}

class DBHelper:
    @staticmethod
    def get_session():
        return SessionLocal()

# 로그인 엔드포인트
@router.post("/login")
async def login(request: Request, student_id: str = Form(...), password: str = Form(...)):
    try:
        # Klas 로그인 시도
        result = await klas_login(student_id, password)

        if result["status"] == "success":
            # Klas에서 가져온 정보
            user_name = result.get("name", "Unknown")  # 기본값 설정
            department = result.get("department", "Undecided")
            major = result.get("major", None)  # 전공은 없으면 NULL

            print(f"Klas Login Success: student_id={student_id}, name={user_name}, department={department}, major={major}")

            # 사용자 정보 저장
            insert_member(student_id=student_id, name=user_name, department=department, major=major)

            # 세션에 학번 및 이름 저장
            request.session["student_number"] = student_id
            request.session["user_name"] = user_name

            return JSONResponse({"success": True, "redirectUrl": result["redirectUrl"]})
        else:
            print(f"Login Failed: student_id={student_id}, reason={result['message']}")
            return JSONResponse({"success": False, "message": result["message"]})

    except Exception as e:
        print(f"Unexpected Error: {e}")
        return JSONResponse({"success": False, "message": "An unexpected error occurred"})
