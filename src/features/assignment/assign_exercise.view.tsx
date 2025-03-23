import {
  Accordion,
  Button,
  Center,
  Checkbox,
  Flex,
  Loader,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { useContext, useState } from "react";
import AuthContext from "../auth/auth.context";
import useGetCenterClassList from "../class/hooks/use_get_center_class_list";
import useCreateAssignments from "./hooks/use_create_assignments";

interface AssignExerciseViewProps {
  exerciseId: string;
  onAssign: () => void;
}

function AssignExerciseView({ exerciseId, onAssign }: AssignExerciseViewProps) {
  const { centerId } = useContext(AuthContext);
  const { data, status, error } = useGetCenterClassList(centerId!, "");
  const [title, setTitle] = useState("No title");
  const [deadline, setDeadline] = useState<Date | null>(null);

  const [selected, setSelected] = useState<
    Array<{ classId: string; userId: string }>
  >([]);

  const { mutateAsync } = useCreateAssignments({
    onSuccess: () => {
      onAssign();
    },
  });

  const handleAssign = async () => {
    if (selected.length == 0) {
      notifications.show({
        message:
          "Please select which classes or students you want to assign the exercise to.",
      });
      return;
    }

    await mutateAsync({
      exerciseId,
      students: Array.from(selected),
      title,
      dueDate: deadline?.toISOString(),
    });
  };

  if (status == "pending")
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (status == "error") return <Center>{error.message}</Center>;

  return (
    <Stack>
      <Flex
        h={"3rem"}
        w={"100%"}
        direction={"row"}
        justify={"start"}
        align={"center"}
        gap={"md"}
      >
        <TextInput
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
        />
        <DateTimePicker
          placeholder="Select deadline"
          value={deadline}
          onChange={setDeadline}
        />
      </Flex>
      <Flex justify={"end"} h={"1rem"}>
        <Text>{selected.length} selected</Text>
      </Flex>
      <ScrollArea h={"calc(100vh - 15rem)"}>
        {data.pages.map((page, index) => {
          return (
            <Accordion key={index}>
              {page?.nodes.map((node) => {
                const filteredMembers = node.members.filter(
                  (e) => e.role == "STUDENT",
                );

                const isSelectedAll = () => {
                  return filteredMembers.every((member) => {
                    const found = selected.find(
                      (e) =>
                        e.classId == node.class.id && e.userId == member.id,
                    );

                    if (!found) {
                      return false;
                    }

                    return true;
                  });
                };

                return (
                  <Accordion.Item key={node.class.id} value={node.class.id}>
                    <Accordion.Control>
                      <Checkbox
                        checked={isSelectedAll()}
                        label={node.class.name}
                        onChange={(event) => {
                          if (event.currentTarget.checked) {
                            setSelected((old) => {
                              const toAdd = filteredMembers.filter((e) => {
                                const found = selected.find(
                                  (s) =>
                                    s.classId == node.class.id &&
                                    s.userId == e.id,
                                );

                                if (found) {
                                  return false;
                                }

                                return true;
                              });

                              return [
                                ...old,
                                ...toAdd.map((e) => {
                                  return {
                                    classId: node.class.id,
                                    userId: e.id,
                                  };
                                }),
                              ];
                            });
                          } else {
                            setSelected((old) => {
                              const removed = old.filter(
                                (e) => e.classId != node.class.id,
                              );

                              return removed;
                            });
                          }
                        }}
                      />
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Stack>
                        {filteredMembers.map((member) => {
                          const isSelected = () => {
                            const found = selected.find(
                              (e) =>
                                e.classId == node.class.id &&
                                e.userId == member.id,
                            );

                            if (!found) {
                              return false;
                            }

                            return true;
                          };
                          return (
                            <Checkbox
                              checked={isSelected()}
                              key={member.id}
                              label={`${member.firstName} ${member.lastName}`}
                              onChange={(event) => {
                                if (event.currentTarget.checked) {
                                  setSelected((old) => {
                                    return [
                                      ...old,
                                      {
                                        classId: node.class.id,
                                        userId: member.id,
                                      },
                                    ];
                                  });
                                } else {
                                  setSelected((old) => {
                                    const copied = [...old];
                                    const index = old.findIndex(
                                      (e) =>
                                        e.userId == member.id &&
                                        e.classId == node.class.id,
                                    );

                                    if (index > -1) {
                                      copied.splice(index, 1);
                                    }

                                    return copied;
                                  });
                                }
                              }}
                            />
                          );
                        })}
                      </Stack>
                    </Accordion.Panel>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          );
        })}
      </ScrollArea>
      <Center h={"2rem"}>
        <Button onClick={handleAssign}>Assign</Button>
      </Center>
    </Stack>
  );
}

export default AssignExerciseView;
