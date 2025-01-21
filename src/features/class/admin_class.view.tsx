import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Loader,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import {
  IconFilter,
  IconPlus,
  IconReload,
  IconSearch,
} from "@tabler/icons-react";
import { Fragment, useCallback, useContext } from "react";
import { useMobile } from "../../core/utils/screen_utils";
import AuthContext from "../auth/auth.context";
import useGetCenterClassList from "./hooks/use_get_center_class_list";

function AdminClassView() {
  const { centerId } = useContext(AuthContext);
  const isMobile = useMobile();

  const handleCreateClassClick = () => {
    openContextModal({
      modal: "createClass",
      title: "Create class",
      fullScreen: isMobile,
      centered: true,
      transitionProps: { transition: "fade", duration: 200 },
      size: "md",
      innerProps: {},
    });
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
    isRefetching,
  } = useGetCenterClassList(centerId!);

  const allClasses = useCallback(() => {
    let classNum = 0;
    data?.pages.forEach((e) => {
      e?.nodes.forEach(() => {
        classNum++;
      });
    });

    return classNum;
  }, [data]);

  return (
    <Stack>
      <Box visibleFrom="sm">
        <Text size="md" fw={"bold"}>
          Class management
        </Text>
        <Text size="xs">Manage your center classes here.</Text>
      </Box>
      <Space h={"16"} />
      <Flex direction={"row"} justify={"space-between"}>
        <Group visibleFrom="sm">
          <Text size="md" fw={"bold"}>
            All classes
          </Text>
          <Text c="gray.5">{allClasses()}</Text>
        </Group>
        <Group>
          <ActionIcon onClick={() => refetch()}>
            <IconReload />
          </ActionIcon>
          <TextInput leftSection={<IconSearch />} placeholder="class name" />
          <ActionIcon>
            <IconFilter />
          </ActionIcon>
          <Button
            leftSection={<IconPlus />}
            size="xs"
            onClick={handleCreateClassClick}
          >
            Create class
          </Button>
        </Group>
      </Flex>

      {status == "pending" ? (
        <Loader />
      ) : status == "error" ? (
        <Text>{error.message}</Text>
      ) : (
        <>
          {data?.pages.map((page, index) => (
            <Fragment key={index}>
              {page?.nodes.map((node) => (
                <Text key={node.id}>{node.name}</Text>
              ))}
            </Fragment>
          ))}
        </>
      )}
    </Stack>
  );
}

export default AdminClassView;
