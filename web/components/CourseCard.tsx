/*
 *  CourseCard.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  The CourseCard component is displayed on the "/courses" page. It is a card
 *  that displays the course title and season. If the user is a teacher, they
 *  will be able to view the course details. If the user is a student, they
 *  will be redirected to the live question page.
 *
 *  Last updated: 05/12/2023
 */

import Image from 'next/image';
import jumbo from '../public/Tufts_Jumbos_logo.png';
import styles from '../styles/courses.module.css';

interface ICourseCard {
    isTeacher: boolean;
    course_id: string;
    course_title: string;
    course_season: string;
}

const CourseCard = ({
    isTeacher,
    course_id,
    course_title,
    course_season,
}: ICourseCard) => {
    return (
        <div className='col-sm-3'>
            <div className={styles.cardCustom}>
                <div className='card'>
                    <Image
                        className={styles.cardImage}
                        src={jumbo}
                        alt='Card image cap'
                    />
                    <div className='card-body'>
                        <h5 className='card-title'>{course_title}</h5>
                        <p className='card-text'>
                            <small className='text-muted'>
                                {course_season}
                            </small>
                        </p>

                        {/* If the user is a teacher, redirect to course editing functions */}
                        {isTeacher && (
                            <a
                                href={`/courses/${course_id}`}
                                className='btn btn-primary'
                            >
                                View Course
                            </a>
                        )}

                        {/* If the user is a student, redirect to live question */}
                        {!isTeacher && (
                            <a
                                href={`/courses/${course_id}/StudentResponse`}
                                className='btn btn-primary'
                            >
                                View Live Question
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
