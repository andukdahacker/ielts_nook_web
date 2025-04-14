import { useContext } from 'react';
import AuthContext from '../auth/auth.context';
import TeacherClassDetailView from './teacher_class_detail.view';

function ClassDetailView() {
    const { user } = useContext(AuthContext);

    switch (user?.role) {
        case 'STUDENT':
            return <>Student Class Detail</>;
        case 'TEACHER':
            return (
                <>
                    <TeacherClassDetailView />
                </>
            );
        case 'ADMIN':
            return <>Admin Class Detail</>;
        default:
            return <>Forbidden</>;
    }
}

export default ClassDetailView;
