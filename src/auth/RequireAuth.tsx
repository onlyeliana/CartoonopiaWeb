import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Navigate } from 'react-router-dom';

export interface IAppProps {
    children?: React.ReactNode
}

export function RequireAuth({ children }: IAppProps) {
    const { user } = useSelector((state: RootState) => state);
    console.log(user);

    return (
        <div>
            {user.isLogin ? children : <Navigate to='/login'></Navigate>}
        </div>

    );
}
