import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useContext } from 'react';
import { GapPlaceholderNode } from '../../common/components/editor/gapPlaceholder/gap_placeholder';
import AuthContext from '../auth/auth.context';

function HomeView() {
    const { center, role, user } = useContext(AuthContext);

    const editor = useEditor({
        extensions: [StarterKit, GapPlaceholderNode],
        content: '',
    });

    if (center) {
        return <>This is IELTS Center {center.name}</>;
    }

    if (user) {
        switch (role) {
            case 'ADMIN':
                return <>Hello Admin ${user.username}</>;
            case 'TEACHER':
                return <>Teacher</>;
            case 'STUDENT':
                return <>Hello Student ${user.username}</>;
        }
    }

    return <>Unsupported role</>;
}

export default HomeView;
