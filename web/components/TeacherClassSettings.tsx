import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { deleteRequest, fetcher } from '../lib/server_requests';

export default function TeacherClassSettings() {
    const router = useRouter();
    const { course_id } = router.query;
    const [courseData, setCourseData] = useState<any>(null);

    const { data } = useSWR(`/api/courses/${course_id}`, fetcher, {
        revalidateOnFocus: false,
    });

    const { trigger } = useSWRMutation('/api/courses', deleteRequest);

    // TODO: Add a 'are you sure' modal and fix the issue with navigating to the home page
    const deleteCourse = () => {
        trigger({
            courseId: course_id,
        });
        router.push('/courses');
    };

    useEffect(() => {
        if (data) setCourseData(data);
    }, [data]);

    return (
        <div>
            {courseData && data && (
                <>
                    <h2>{courseData.name}</h2>
                    <h5>Description: {courseData.description}</h5>
                    <h5>Season: {courseData.season}</h5>
                    <h5>Course Code: {courseData.numId}</h5>
                    <Button
                        onClick={deleteCourse}
                        style={{
                            backgroundColor: '#ce2029',
                            borderColor: '#ce2029',
                        }}
                    >
                        Delete Course
                    </Button>
                </>
            )}
        </div>
    );
}
