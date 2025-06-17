import { useContext } from 'react';
import AuthContext from '../auth/auth.context';
import AdminClassDetailView from './admin_class_detail.view';
import TeacherClassDetailView from './teacher_class_detail.view';

function ClassDetailView() {
    const { role } = useContext(AuthContext);

    switch (role) {
        case 'STUDENT':
            return <>Student Class Detail</>;
        case 'TEACHER':
            return (
                <>
                    <TeacherClassDetailView />
                </>
            );
        case 'ADMIN':
            return (
                <>
                    <AdminClassDetailView />
                </>
            );
        default:
            return <>Forbidden</>;
    }
}

export default ClassDetailView;
