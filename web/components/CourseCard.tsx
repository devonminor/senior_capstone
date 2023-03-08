import Image from 'next/image';
import jumbo from '../public/Tufts_Jumbos_logo.png';
import styles from '../styles/courses.module.css';

interface ICourseCard {
    course_title: string;
    course_season: string;
}

const CourseCard = ({ course_title, course_season }: ICourseCard) => {
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
                        <a href='/courses/cs116' className='btn btn-primary'>
                            View Course
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
