import { ActionIcon, Avatar, Menu, Modal, Table, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconDotsVertical, IconEdit, IconFolderRoot, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { useMobile } from '../../core/utils/screen_utils';
import { Class, User } from '../../schema/types';
import EditClassModal from './edit_class.modal';
import useDeleteClass from './hooks/use_delete_class';
import { useContext } from 'react';
import AuthContext from '../auth/auth.context';

interface ClassRowProps {
    klass: Class;
    teachers: User[];
    students: User[];
}

function ClassRow({ klass, teachers, students }: ClassRowProps) {
    const { user } = useContext(AuthContext);
    const [editModalOpened, { close: closeEditModal, open: openEditModal }] = useDisclosure(false);
    const isMobile = useMobile();

    const { mutateAsync } = useDeleteClass();

    const navigate = useNavigate();

    return (
        <>
            <Table.Tr>
                <Table.Td>{klass?.name}</Table.Td>
                <Table.Td>
                    <Text size="xs" truncate="end" maw="200">
                        {klass?.description}
                    </Text>
                </Table.Td>
                <Table.Td>{students?.length}</Table.Td>
                <Table.Td>
                    <Avatar.Group>
                        {teachers?.map(teacher => (
                            <Tooltip key={teacher.id} label={teacher.firstName + ' ' + teacher.lastName}>
                                <Avatar
                                    id={teacher.id}
                                    name={teacher.firstName + ' ' + teacher.lastName}
                                    color="initials"
                                />
                            </Tooltip>
                        ))}
                    </Avatar.Group>
                </Table.Td>
                <Table.Td>
                    <Menu shadow="md" width={120}>
                        <Menu.Target>
                            <ActionIcon variant="transparent">
                                <IconDotsVertical />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={<IconFolderRoot size={14} />}
                                onClick={() => {
                                    navigate(`/class/${klass.id}`);
                                }}
                            >
                                View
                            </Menu.Item>
                            {user?.role == 'ADMIN' && (
                                <Menu.Item leftSection={<IconEdit size={14} />} onClick={() => openEditModal()}>
                                    Edit
                                </Menu.Item>
                            )}
                            {user?.role == 'ADMIN' && (
                                <Menu.Item
                                    leftSection={<IconTrash size={14} />}
                                    color="red"
                                    onClick={() => {
                                        modals.openConfirmModal({
                                            title: 'Delete class',
                                            centered: true,
                                            children: (
                                                <>
                                                    <Text>Are you sure you want to delete this class?</Text>
                                                </>
                                            ),
                                            labels: { confirm: 'Delete', cancel: 'Cancel' },
                                            onConfirm: async () => {
                                                const id = notifications.show({
                                                    message: 'Deleting class...',
                                                    autoClose: false,
                                                });
                                                await mutateAsync(klass.id);
                                                notifications.hide(id);
                                            },
                                        });
                                    }}
                                >
                                    Delete
                                </Menu.Item>
                            )}
                        </Menu.Dropdown>
                    </Menu>
                </Table.Td>
            </Table.Tr>
            <Modal
                opened={editModalOpened}
                onClose={closeEditModal}
                title="Edit class"
                fullScreen={isMobile}
                centered={true}
            >
                <EditClassModal
                    onUpdateSuccess={() => closeEditModal()}
                    klass={klass}
                    members={[...teachers, ...students]}
                />
            </Modal>
        </>
    );
}
export default ClassRow;
