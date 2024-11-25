import os
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.output_parsers import OutputFixingParser, PydanticOutputParser
from pydantic import BaseModel, Field
from langchain.chains import LLMChain
import json
from dotenv import load_dotenv
import os

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("환경 변수가 설정되지 않음.")

class ExamParser(BaseModel):
    question_rank: list[str] = Field(description="내가 이 분야에 종사하기 위해서 알아야하는 지식 키워드 10가지")

def generate_keywords(field: str):
    llm = ChatOpenAI(model="gpt-4", temperature=0, openai_api_key=openai_api_key)
    pydantic_parser = PydanticOutputParser(pydantic_object=ExamParser)
    parser = OutputFixingParser.from_llm(parser=pydantic_parser, llm=llm)

    prompt = PromptTemplate(
        template=(
            "안녕. 너는 광운대학교 인공지능 융합대학의 졸업 예정 학생이야. "
            "너는 지금 {field} 직무를 희망하고 있어. "
            "아래 JSON 형식으로만 답변해줘:\n"
            "{"
            "  \"question_rank\": ["
            "    \"키워드1\","
            "    \"키워드2\","
            "    \"키워드3\","
            "    \"키워드4\","
            "    \"키워드5\","
            "    \"키워드6\","
            "    \"키워드7\","
            "    \"키워드8\","
            "    \"키워드9\","
            "    \"키워드10\""
            "  ]"
            "}\n"
            "JSON 외의 다른 텍스트는 포함하지 말아줘."
        ),
        input_variables=["field"]
    )

    # Initialize LLM Chain
    chain = LLMChain(llm=llm, prompt=prompt, output_parser=parser)

    try:
        # Run the chain and parse the output
        llm_answer = chain.invoke({"field": field})
        return llm_answer
    except Exception as e:
        print(f"Error during parsing or invocation: {e}")
        return {"error": str(e)}
