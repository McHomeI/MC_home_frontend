import "./App.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route } from 'react-router-dom';
import "./Timeline.css";


function App() {
  return (
    <div className="App">
      <header>
        <Navbar bg="dark" data-bs-theme="dark" className="navi">
          <Container>
            <Navbar.Brand href="/"><div className="MC_logo"></div></Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">홈</Nav.Link>
              <Nav.Link href='/question'>질문</Nav.Link>
              <Nav.Link href="/timeLine">수업 내용</Nav.Link>
              <Nav.Link href="/project">프로젝트</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>


      <Routes>
        <Route path="/" element={
          <>
            <SlideNavigation />
            <SlideContainer />
          </>
        } />
        <Route path='/timeLine' element={
          <>
            <TimeLine />
          </>
        } />
      </Routes>

    </div>
  );
}


function TimeLine() {
  const timelineData = [
    { week: "1주차", title: "OT.git", iconClass: "fa-brands fa-git", description: "동아리 계획 안내 및 Git 사용법 강의" },
    { week: "2주차", title: "Java 기본", iconClass: "fa-brands fa-java", description: "자바 기본 문법을 익히고 실습합니다." },
    { week: "3주차", title: "C 프로그래밍", iconClass: "fa-brands fa-c", description: "C 언어의 기초를 배우고 실습합니다." },
    { week: "4주차", title: "알고리즘 기초", iconClass: "fa-solid fa-scroll", description: "기본적인 알고리즘과 문제 해결 방법을 학습합니다." },
    { week: "5주차", title: "자료구조", iconClass: "fa-solid fa-scroll", description: "스택, 큐, 리스트 등의 자료구조 개념을 익힙니다." },
    { week: "7주차", title: "프레임워크 활용", iconClass: "fa-solid fa-scroll", description: "Spring과 같은 프레임워크를 사용해 프로젝트를 진행합니다." },
    { week: "8주차", title: "프로젝트 발표", iconClass: "fa-solid fa-scroll", description: "각 팀의 프로젝트를 발표하고 피드백을 받습니다." },
    { week: "2학기", title: "심화 학습", iconClass: "fa-solid fa-scroll", description: "고급 개발 기법 및 협업을 중심으로 학습합니다." }
  ];
  
  const [visibleBoxes, setVisibleBoxes] = useState<boolean[]>([]);

  
    useEffect(() => {
      const checkBoxes = () => {
        const triggerBottom = window.innerHeight * 0.9;
        const newVisibleBoxes = timelineData.map((_, index) => {
          const box = document.getElementById(`box-${index}`);
          if (box) {
            const boxTop = box.getBoundingClientRect().top;
            return boxTop < triggerBottom;
          }
          return false;
        });
  
        setVisibleBoxes(newVisibleBoxes);
      };
  
      checkBoxes(); // 페이지 로드 시 실행
      window.addEventListener("scroll", checkBoxes);
  
      return () => window.removeEventListener("scroll", checkBoxes);
    }, []);
  
    return (
      <section id="timeline">
        <h2 className="heading"></h2>
        <ul>
          {timelineData.map((item, index) => (
            <li key={index}>
              <i className={item.iconClass}></i>
              <div id={`box-${index}`} className={`box ${visibleBoxes[index] ? "show" : ""}`}>
                <h3 className="timeline-title">
                  <span className="timeline-year">{item.week}</span> {item.title}
                </h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
}

function SlideContainer() {
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const setRef = useCallback((index: number) => (el: HTMLSpanElement | null) => {
    titleRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    titleRefs.current.forEach((el) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("animate");
          } else {
            el.classList.remove("animate");
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);


  const [isIntro1Visible, setIsIntro1Visible] = useState(false);

  const toggleIntro1 = () => {
    setIsIntro1Visible((prev) => !prev);
  };

  return (
    <div className="slideContainer">
      <div className="slide" id="slide_1">
        <h1 className="big_number big_num" ref={setRef(7)}>01</h1>
        <div className="line" ref={setRef(4)}></div>
        <h2 className="title_content_right">
          <span className="letter" ref={setRef(0)}>
            Meeting for Competition <br /> 경쟁을 위한 모임
          </span>
        </h2>
        <div className="introduce intro1">
          <button className="rule" onClick={toggleIntro1}>MC 규칙</button>
          <span className={`intro_text ${isIntro1Visible ? "show" : ""}`}>
            밥 꼭꼭 씹어서<br />
            빨리 먹기
          </span>
        </div>
      </div>
      <div className="slide" id="slide_2">
        <h1 className="big_number2 big_num" ref={setRef(8)}>02</h1>
        <div className="line2" ref={setRef(5)}></div>
        <h2 className="title_content_left">
          <span className="letter2" ref={setRef(1)}>
            선배들과 함께하는 <br /> 유익한 수업
          </span>
        </h2>
        <div className="introduce intro2">
          <p>우리가 하는 일</p>
          <p>실전 대비 – 대회 준비 및 문제 해결 능력 향상</p>
          <p>다양한 프로젝트 – 팀워크와 실전 개발 경험</p>
          <p>멘토링 시스템 – 선배들과의 교류로 빠른 성장</p>
        </div>
      </div>
      <div className="slide" id="slide_3">
        <h1 className="big_number3 big_num" ref={setRef(9)}>03</h1>
        <div className="line3" ref={setRef(6)}></div>
        <h2 className="title_content_right">
          <span className="letter" ref={setRef(2)}>
            다양한 프로젝트 <br /> 그리고 경험.
          </span>
        </h2>
        <div className="introduce intro3">
          <p>함께 도전하고 성장하는 Meeting for Competition 바로 MC에서 여러분을 기다립니다!</p>
        </div>
      </div>
    </div>
  );
}

const SlideNavigation = () => {
  const [activeSlide, setActiveSlide] = useState("#slide_1");

  useEffect(() => {
    const sections = document.querySelectorAll(".slide");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlide(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.6, // 화면 60% 이상 보이면 활성화
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="move_section">
      <div className="section_controller">
        <a href="#slide_1">
          <div className={`move_bar1 move_bar ${activeSlide === "#slide_1" ? "active" : ""}`}></div>
        </a>
        <a href="#slide_2">
          <div className={`move_bar2 move_bar ${activeSlide === "#slide_2" ? "active" : ""}`}></div>
        </a>
        <a href="#slide_3">
          <div className={`move_bar3 move_bar ${activeSlide === "#slide_3" ? "active" : ""}`}></div>
        </a>
      </div>
    </div>
  );
};



export default App;
