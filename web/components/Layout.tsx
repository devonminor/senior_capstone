import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import gear from '../public/gear-wide-connected.svg';
import logo from '../public/Poll_Anywhere_logo.png';
import styles from '../styles/Layout.module.css';
import parse_course_id from './parse_course_id';

interface LayoutProps {
    children: React.ReactNode;
    course_id: any;
}

export default function Layout({ children, course_id }: LayoutProps) {
    var course_name = '';
    const router = useRouter();

    if (router.route == '/courses') {
        course_name = 'My Courses';
    } else if (parse_course_id(course_id).length > 0) {
        course_name = parse_course_id(course_id);
    }

    return (
        <div>
            <nav
                className={`navbar navbar-expand-fluid sticky-top bg-light ${styles.navbarCustom}`}
            >
                <div className={`row ${styles.navRow}`}>
                    <div className={`col ${styles.navLeft}`}>
                        <a className='navbar-brand' href='/'>
                            <Image
                                className={styles.PAlogo}
                                src={logo}
                                alt='Bootstrap'
                            />
                        </a>
                    </div>
                    <div className={`col ${styles.navCenter}`}>
                        <h1 className={styles.courseText}>{course_name}</h1>
                    </div>
                    <div className={`col ${styles.navRight}`}>
                        <a href='/settings'>
                            <Image
                                className={styles.gearIcon}
                                src={gear}
                                alt='Bootstrap'
                            />
                        </a>
                    </div>
                </div>
            </nav>
            <div>
                <main>{children}</main>
            </div>
        </div>
    );
}
