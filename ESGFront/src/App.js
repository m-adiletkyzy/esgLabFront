import Home from './pages/Home'
import NewsPage from './pages/NewsPage/NewsPage'
import CoursePage from './pages/CoursesPage/CoursePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ProjectPage from "./components/projectPage/ProjectPage";
import EventPage from "./components/eventPage/EventPage";
import Campus from "./components/campus/Campus";
import EsgLab from "./components/esgLab/EsgLab";
import Esg from "./components/esg/Esg";
import OurArticleDetail from "./components/ourArticleDetail/OurArticleDetail";
import "./app.scss";
import { Routes, Route } from "react-router-dom";
import OurEventPage from "./components/ourEventPage/OurEventPage";
import OurCoursePage from "./components/ourCoursePage/OurCoursePage";
import OurProjectPage from "./components/ourProjectPage/OurProjectPage";
import AuthPage from './pages/AuthPage/AuthPage'
import VerifyPage from './pages/AuthPage/VerifyPage';
import VerifyNotice from './pages/AuthPage/VerifyNotice';
import LogoutPage from './pages/AuthPage/LogoutPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/news' element={<NewsPage/>}/>
        <Route path='/course' element={<CoursePage/>}></Route>
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/about" element={<Esg />} />
        <Route path="/esg-lab" element={<EsgLab />} />
        <Route path='/auth' element={<AuthPage />}></Route>
        <Route path="/verify-email" element={<VerifyNotice />} />
        <Route path="/verify/:uid/:token" element={<VerifyPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path="/our-article/:id" element={<OurArticleDetail />} />
        <Route path="/our-event/:id" element={<OurEventPage />} />
        <Route path="/our-course/:id" element={<OurCoursePage />} />
        <Route path="/our-project/:id" element={<OurProjectPage />} />
        <Route path="/esg-campus" element={<Campus />} />
      </Routes>
    </div>
  );
}

export default App;
