import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Button } from 'react-bootstrap';

const Profile = (): React.ReactElement => {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <>
            {user && (
                <div>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>

                    <Button href='/api/auth/logout'>Logout</Button>
                </div>
            )}
        </>
    );
};

export default withPageAuthRequired(Profile);
