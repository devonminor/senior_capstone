import { useRouter } from "next/router";

const Lecture = () => {
    const router = useRouter();
    const {course_id, lecture_id} = router.query;

    console.log(router.query)
    
    return (
        <div>
            <h4>Course #{course_id}</h4>
            <h5>Lecture #{lecture_id}</h5>
        </div>
    )
}

export default Lecture;