import { useRouter } from "next/router";
import TeacherPage from '../../TeacherPage';



const Lecture = () => {
    const router = useRouter();
    const {course_id, lecture_id} = router.query;
    
    return (
        <div>
            <h4>Course #{course_id}</h4>
            <h5>Lecture #{lecture_id}</h5>

            <TeacherPage
                course_id = {course_id}
                lecture_id = {lecture_id}
            ></TeacherPage>
        </div>
    )
}

export default Lecture;