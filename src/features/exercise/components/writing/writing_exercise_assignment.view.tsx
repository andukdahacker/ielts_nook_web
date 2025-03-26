import {
  ActionIcon,
  Box,
  Center,
  Flex,
  Image,
  ScrollArea,
  Stack,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Allotment } from "allotment";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Assignment,
  Exercise,
  WritingExercise,
} from "../../../../schema/types";
import HomeContext from "../../../home/home.context";
import useCreateSubmission from "../../../submission/hooks/use_create_submission";

interface WritingExerciseAssignmentViewProps {
  exercise: Exercise;
  assignment: Assignment;
}

function WritingExerciseAssignmentView({
  exercise,
  assignment,
}: WritingExerciseAssignmentViewProps) {
  const { setShowTimer, showTimer, setTimer, timer } = useContext(HomeContext);
  const writingExercise = exercise.content as WritingExercise;
  const file = writingExercise.file;
  const type = writingExercise.type;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: writingExercise.title as Content,
    editable: false,
  });

  const [value, setValue] = useState("");

  const wordCount = () => {
    const count = value == "" ? 0 : value.trim().split(" ").length;

    return count;
  };

  useEffect(() => {
    if (writingExercise.duration) {
      setTimer(writingExercise.duration * 60);
      setShowTimer(true);
    }

    return () => {
      setTimer(0);
      setShowTimer(false);
    };
  }, [writingExercise.duration, setTimer, setShowTimer]);

  const navigate = useNavigate();

  const { mutateAsync } = useCreateSubmission({onSuccess: () => {
    navigate("/assignment")
  }});

  const handleSubmit = async () => {
    const id = notifications.show({
      message: "Submitting...",
      autoClose: false,
    });

    try {
      await mutateAsync({
        assignmentId: assignment.id,
        content: { value: value },
      });
    } finally {
      notifications.hide(id);
    }
  };

  useEffect(() => {
    if (timer == 0 && showTimer) {
      const submit = async () => {
        const id = notifications.show({
          message: "Submitting...",
          autoClose: false,
        });

        try {
          await mutateAsync({
            assignmentId: assignment.id,
            content: { value: value },
          });
        } finally {
          notifications.hide(id);
        }
      };
      submit();
    }
  }, [timer, showTimer]);

  return (
    <>
      <Box h={"calc(100vh - 65px - 65px)"}>
        <Allotment>
          <Allotment.Pane>
            <ScrollArea h={"calc(100vh - 65px - 65px)"}>
              <Stack>
                <Center>
                  <EditorContent editor={editor} />
                </Center>
                {file && type == "Task 1" && <Image src={file.url} />}
              </Stack>
            </ScrollArea>
          </Allotment.Pane>
          <Allotment.Pane>
            <Stack p={"md"} h={"100%"}>
              <textarea
                style={{ height: "100%", width: "100%", resize: "none" }}
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
              />
              <Flex direction={"row"} justify={"end"}>
                Words: {wordCount()}
              </Flex>
            </Stack>
          </Allotment.Pane>
        </Allotment>
        <Flex h={"65px"} direction={"row"} justify={"end"} align={"center"}>
          <ActionIcon
            size={"xl"}
            onClick={() => {
              handleSubmit();
            }}
          >
            <IconCheck />
          </ActionIcon>
        </Flex>
      </Box>
    </>
  );
}

export default WritingExerciseAssignmentView;
