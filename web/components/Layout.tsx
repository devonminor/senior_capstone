/*
 *  Layout.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  The layout displayed on every page of the website.
 *
 *  Last updated: 05/12/2023
 */

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../public/Poll_Anywhere_logo.png';
import styles from '../styles/Layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
    course_id: any;
}

export default function Layout({ children, course_id }: LayoutProps) {
    const [courseName, setCourseName] = React.useState<string>('');
    const router = useRouter();
    const { user, isLoading: userLoading } = useUser();

    // Set the course name at the top of the page as appropriate
    useEffect(() => {
        if (router.route == '/courses') {
            setCourseName('Dashboard');
        } else if (
            router.route == '/courses/[course_id]' ||
            router.route == '/courses/[course_id]/lectures/[lecture_id]' ||
            router.route == '/courses/[course_id]/StudentResponse'
        ) {
            const { course_id } = router.query;
            fetch(`/api/courses/${course_id}`)
                .then((res) => res.json())
                .then((data) => {
                    setCourseName(data.name);
                });
        }
    }, [router]);

    return (
        <>
            {/* Navigation header for every page */}
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
                        <h1 className={styles.courseText}>{courseName}</h1>
                    </div>

                    {/* Logged Out */}
                    {!user && !userLoading && (
                        <div className={`col ${styles.navRight}`}>
                            <Button href='/api/auth/login'>
                                Login with Google
                            </Button>
                        </div>
                    )}

                    {/* Logged In */}
                    {user && (
                        <div className={`col ${styles.navRight}`}>
                            <Button href='/api/auth/logout'>Logout</Button>
                            <FaUserCircle
                                onClick={() => router.push('/profile')}
                                style={{
                                    height: 25,
                                    width: 'auto',
                                    marginLeft: 10,
                                }}
                            />
                        </div>
                    )}
                </div>
            </nav>

            {/* Main content of each page */}
            <main>{children}</main>
        </>
    );
}
