/*
 *  profile.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  This file displays the user's profile information including their name,
 *  email and whether or not they are a student or teacher. It also provides
 *  the user with another way to login.
 *
 *  Last updated: 05/12/2023
 */

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import useSWR from 'swr';
import { fetcher } from '../lib/server_requests';

const Profile = (): React.ReactElement => {
    const [hasTeacherCourses, setHasTeacherCourses] = useState(false);
    const [hasStudentCourses, setHasStudentCourses] = useState(false);

    // Load the user data from both the server and Auth0
    const {
        user: auth0User,
        error: auth0Error,
        isLoading: auth0IsLoading,
    } = useUser();
    const {
        data: meDataUser,
        isLoading: meDataIsLoading,
        error: meDataError,
    } = useSWR('/api/me', fetcher, {
        revalidateOnFocus: false,
    });

    // Once the user's login information has been loaded, check if they have any courses
    useEffect(() => {
        if (meDataUser) {
            if (
                meDataUser.teacherCourses &&
                meDataUser.teacherCourses.length > 0
            ) {
                setHasTeacherCourses(true);
            }
            if (
                meDataUser.studentCourses &&
                meDataUser.studentCourses.length > 0
            ) {
                setHasStudentCourses(true);
            }
        }
    }, [meDataUser]);

    // While loading or if an error occurs, display a loading/error message
    if (auth0IsLoading || meDataIsLoading) return <div>Loading...</div>;
    if (auth0Error) return <div>{auth0Error.message}</div>;
    if (meDataError) return <div>{meDataError.message}</div>;

    return (
        <>
            {auth0User && meDataUser && (
                <Container>
                    <Row>
                        <h2>Profile</h2>
                    </Row>

                    <Row>
                        <Col md={7}>
                            <Card>
                                {/* If the user has only teacher courses, the header should say teacher.
                                    If the user has only student courses, the header should say student.
                                    If the user has teacher and student courses, the header should say teacher/student.
                                    If the user has neither, there should not be a header.  */}
                                {hasTeacherCourses && hasStudentCourses && (
                                    <Card.Header as='h5'>
                                        Teacher/Student
                                    </Card.Header>
                                )}
                                {hasTeacherCourses && !hasStudentCourses && (
                                    <Card.Header as='h5'>Teacher</Card.Header>
                                )}
                                {!hasTeacherCourses && hasStudentCourses && (
                                    <Card.Header as='h5'>Student</Card.Header>
                                )}

                                <Card.Body>
                                    <Card.Title>{auth0User.name}</Card.Title>
                                    <Card.Text>{auth0User.email}</Card.Text>
                                    <Button href='/api/auth/logout'>
                                        Logout
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default withPageAuthRequired(Profile);
