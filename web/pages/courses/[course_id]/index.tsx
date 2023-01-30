import { useRouter } from "next/router";

const Course = () => {
    const router = useRouter();
    const course_id = router.query.course_id;


    return (
        <div>
            <h4>Course #{course_id}</h4>
        </div>
    )
}

export default Course;