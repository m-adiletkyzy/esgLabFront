import axios from "axios";
import { useTranslation } from "react-i18next";
import Header from '../../components/header/Header';
import './course.scss'
import CourseBlock from '../../components/CourseBlock/CourseBlock';
import Footer from '../../components/footer/Footer';
import api from "../../api";

function CoursePage() {
  const { t } = useTranslation();

    return (
        <>
            <Header />
            <div className='content'>
                <main className='main-course'>
                    <CourseBlock />
                </main>
            </div>
            <Footer/>
        </>
    )
}

export default CoursePage;