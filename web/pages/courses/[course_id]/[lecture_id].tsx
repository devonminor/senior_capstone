import { useRouter } from "next/router";
import TeacherPage from '../../TeacherPage';



const Lecture = () => {
    const router = useRouter();
    console.log(router.route);
    const {course_id, lecture_id} = router.query;
    
    return (
        <div>
            <TeacherPage course_id={course_id} lecture_id={lecture_id}/>
        </div>
    )
}

export default Lecture;