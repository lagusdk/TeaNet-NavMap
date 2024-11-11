import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/AboutTeanet.css";
import githubIcon from "../imgs/github.svg";

// 이미지 import
import 라현아 from "../imgs/라현아.png";
import 이하랑 from "../imgs/이하랑.png";
import 김다솔 from "../imgs/김다솔.png";
import 최은비 from "../imgs/최은비.png";
import 전서연 from "../imgs/전서연.png";
import 유아름 from "../imgs/유아름.png";
import 이은송 from "../imgs/이은송.png";
import 장윤선 from "../imgs/장윤선.png";

const teamMembers = [
    { name: "라현아", role: "학습모임 리더, FE", major: "Visual Technology 전공", github: "lagusdk", photo: 라현아 },
    { name: "이하랑", role: "Back-end 파트장", major: "Data Science 전공", github: "XII28", photo: 이하랑 },
    { name: "김다솔", role: "BE", major: "Data Science 전공", github: "dasolkim7", photo: 김다솔 },
    { name: "최은비", role: "BE", major: "Data Science 전공", github: "dmsqlder", photo: 최은비 },
    { name: "전서연", role: "Front-end 파트장", major: "Visual Technology 전공", github: "junsy0901", photo: 전서연 },
    { name: "유아름", role: "FE", major: "Visual Technology 전공", github: "yooaknow", photo: 유아름 },
    { name: "이은송", role: "FE", major: "Visual Technology 전공", github: "shoungli415", photo: 이은송 },
    { name: "장윤선", role: "FE", major: "Visual Technology 전공", github: "yunseonny", photo: 장윤선 },
  ];

  const AboutTeanet = () => {
    return (
      <div className="team-container">
        <h2>TeaNet은...</h2>
        <p className="team-description">
                광운대학교 정보융합학부의 2학년 개발자들이 모여, <br />
                소통과 협업을 통해 함께 성장하고 발전하는 팀입니다.
        </p>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <div
                className="member-photo"
                style={{
                  backgroundImage: `url(${member.photo})`,
                }}
                alt={`${member.name} 사진`}
              ></div>
              <h3>{member.name}</h3>
              <p className="member-role">{member.role ? member.role : "팀원"}</p>
              <p className="member-major">{member.major}</p>
              {member.github && (
                <a
                  href={`https://github.com/${member.github}`}
                  className="member-github"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <img src={githubIcon} alt="GitHub 아이콘" />
                  <span className="github-id">{member.github}</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

export default AboutTeanet;
