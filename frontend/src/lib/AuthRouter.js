import { Outlet, Navigate } from 'react-router-dom';

export const AuthRouter = ({ currentUser }) => {
    return currentUser ? <Outlet /> : <Navigate to='/login' />
}