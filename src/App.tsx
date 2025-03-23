import "./App.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect, useRef, useCallback } from "react";

function App() {
  return (
    <div className="App">



      <header>
        {/* <div className="navi">
          <h4>MC</h4>
        </div>
        <div className="classButton">
          <a href="#">질문</a>
          <a href="#">수업 내용</a>
          <a href="#">프로젝트</a>
        </div> */}
        <Navbar bg="dark" data-bs-theme="dark" className="navi">
          <Container>
            <Navbar.Brand href="#home"><div className="MC_logo"></div></Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">질문</Nav.Link>
              <Nav.Link href="#features">수업 내용</Nav.Link>
              <Nav.Link href="#pricing">프로젝트</Nav.Link>
              <Nav.Link href="#prfile">프로필</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <SlideNavigation />
      {/* <div className="move_section">
        <div className="section_controller">
          <a href="#slide_1"><div className="move_bar1 move_bar"></div></a>
          <a href="#slide_2"><div className="move_bar2 move_bar"></div></a>
          <a href="#slide_3"><div className="move_bar3 move_bar"></div></a>
        </div>
      </div> */}

      <SlideContainer />

    </div>
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
            Meating for Competition <br /> 경쟁을 위한 모임
          </span>
        </h2>
        <div className="introduce intro1" ref={setRef(10)}>
          <button className="rule" onClick={toggleIntro1}>MC 규칙</button>
          <span className={`intro_text ${isIntro1Visible ? "show" : ""}`}>
            밥 꼭꼭 씹어서<br/>
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
        <div className="introduce intro2" ref={setRef(11)}>
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
        <div className="introduce intro3" ref={setRef(12)}>
          <p>함께 도전하고 성장하는 Meating for Competition 바로 MC에서 여러분을 기다립니다!</p>
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
