import { Center, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from './auth.context';
import useMe from './hooks/use_me.hook';

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    const { data, error, isLoading } = useMe();

    useEffect(() => {
        if (error) {
            localStorage.removeItem('token');
            notifications.show({ message: error.message, color: 'red' });
            navigate('/signIn');
        }
    }, [error, navigate]);

    return (
        <AuthContext.Provider
            value={{
                authenticated: data != undefined,
                center: data?.center,
                user: data?.user,
                role: data?.center ? 'ADMIN' : data?.user?.role,
                centerId: data?.center ? data.center.id : data?.user?.centerId,
                isLoading,
            }}
        >
            {isLoading ? (
                <Center h={'100vh'}>
                    <Loader />
                </Center>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
