import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  NumberInput,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconFile, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useContext } from "react";
import EditorInput from "../../../../common/components/editor/editor";
import { WritingExercise, WritingExerciseType } from "../../../../schema/types";
import useDeleteWritingImage from "../../hooks/use_delete_writing_image";
import useUpdateExercise from "../../hooks/use_update_exercise";
import useUploadWritingImage from "../../hooks/use_upload_writing_image";
import { WritingComposerContext } from "./writing_composer.context";
import classes from "./writing_composer.module.css";
import WritingPreviewerView from "./writing_previewer.view";

function WritingComposerEditView() {
  const {
    name,
    setName,
    title,
    setTitle,
    file,
    setFile,
    exercise,
    type,
    setType,
    duration,
    setDuration,
  } = useContext(WritingComposerContext);

  const [opened, { close, open: openPreview }] = useDisclosure();

  const { mutateAsync: uploadWritingFile } = useUploadWritingImage({
    onSuccess: (data) => {
      const writingExercise = data.content as WritingExercise;

      setFile(writingExercise["file"]);
    },
  });

  const handleUploadFile = async (file: FileWithPath) => {
    const id = notifications.show({
      message: "Uploading file...",
      autoClose: false,
    });

    try {
      const blob = await file.arrayBuffer();
      const fileName = file.name;

      await uploadWritingFile({
        id: exercise?.id ?? "",
        file: blob,
        fileName,
      });
    } finally {
      notifications.hide(id);
    }
  };

  const { mutate: deleteWritingFile, status: deleteWritingFileStatus } =
    useDeleteWritingImage({
      onSuccess: () => {
        setFile(undefined);
      },
    });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: title,
    onUpdate: ({ editor }) => {
      setTitle(editor.getJSON());
    },
  });

  const { mutate: updateExercise, status: updateExerciseStatus } =
    useUpdateExercise();

  return (
    <>
      <Stack>
        <Paper withBorder m={"1rem"}>
          <Flex direction={"column"}>
            <Group
              p={"xs"}
              h={"48px"}
              className={classes.header}
              align="center"
              justify="space-between"
            >
              <TextInput
                value={name}
                onChange={(event) => {
                  setName(event.currentTarget.value);
                }}
                size="xs"
              />
              <Group>
                <Text size="xs">Type</Text>
                <Select
                  data={["Task 1", "Task 2"]}
                  size="xs"
                  value={type}
                  onChange={(value) => {
                    if (value) {
                      setType(value as WritingExerciseType);
                    }
                  }}
                />
              </Group>

              <Group>
                <Text size="xs">Duration</Text>
                <NumberInput
                  size="xs"
                  value={duration}
                  onChange={(value) => {
                    if (typeof value == "number") {
                      setDuration(value);
                    }
                  }}
                />
              </Group>

              <Group>
                <Button size="xs" variant="transparent" onClick={openPreview}>
                  Preview form
                </Button>
              </Group>
            </Group>

            <Box h={"calc(100vh - 2rem - 48px - 48px - 65px - 0.625rem)"}>
              <ScrollArea h={"calc(100% - 48px)"}>
                <Stack p={"xs"}>
                  <EditorInput editor={editor} label="Content" />
                  {type == "Task 2" ? (
                    <></>
                  ) : file != undefined ? (
                    <Group>
                      <img src={file.url} />
                      <Text>{file.fileName}</Text>
                      <ActionIcon
                        color="red"
                        loading={deleteWritingFileStatus == "pending"}
                        onClick={() => {
                          deleteWritingFile({
                            id: exercise?.id ?? "",
                            key: file.key,
                          });
                        }}
                      >
                        <IconTrash />
                      </ActionIcon>
                    </Group>
                  ) : (
                    <Dropzone
                      onDrop={(files) => {
                        handleUploadFile(files[0]);
                      }}
                      accept={["image/*"]}
                      maxSize={1024 * 1024 * 25}
                    >
                      <Group
                        justify="center"
                        gap="xl"
                        mih={220}
                        style={{ pointerEvents: "none" }}
                      >
                        <Dropzone.Accept>
                          <IconUpload
                            size={52}
                            color="var(--mantine-color-blue-6)"
                            stroke={1.5}
                          />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                          <IconX
                            size={52}
                            color="var(--mantine-color-red-6)"
                            stroke={1.5}
                          />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                          <IconFile
                            size={52}
                            color="var(--mantine-color-dimmed)"
                            stroke={1.5}
                          />
                        </Dropzone.Idle>

                        <div>
                          <Text size="xl" inline>
                            Drag image here or click to select file
                          </Text>
                        </div>
                      </Group>
                    </Dropzone>
                  )}
                </Stack>
              </ScrollArea>
            </Box>
            <Group
              h={"48px"}
              className={classes.composerFooter}
              justify="end"
              align="center"
              p={"xs"}
            >
              <Button
                size="xs"
                onClick={() => {
                  updateExercise({
                    content: {
                      file,
                      type,
                      title,
                      duration,
                    },
                    id: exercise?.id ?? "",
                    name,
                  });
                }}
                loading={updateExerciseStatus == "pending"}
                disabled={updateExerciseStatus == "pending"}
              >
                Save changes
              </Button>
            </Group>
          </Flex>
        </Paper>
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        title={"Preview"}
        fullScreen={true}
      >
        <WritingPreviewerView
          title={title}
          name={name}
          file={file}
          duration={duration}
          type={type}
        />
      </Modal>
    </>
  );
}

export default WritingComposerEditView;
