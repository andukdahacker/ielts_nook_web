import {
  Badge,
  Button,
  Checkbox,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Fragment, useState } from "react";
import useDebounce from "../../core/hooks/use_debouce";
import { User } from "../../schema/types";
import useGetUserList from "../users/hooks/user_get_user_list";

interface AddClassMemberModalProps {
  addedMembers: User[];
  onDone: (users: User[]) => void;
}

function AddClassMemberModal({
  addedMembers,
  onDone,
}: AddClassMemberModalProps) {
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString, 500);

  const [added, setAdded] = useState([...addedMembers]);

  const addMember = (user: User) => {
    setAdded((users) => [...users, user]);
  };

  const removeMember = (user: User) => {
    const copyMems = [...added];
    const index = copyMems.indexOf(user);
    if (index > -1) {
      copyMems.splice(index, 1);
    }

    setAdded(copyMems);
  };

  const handleDoneClick = () => {
    onDone(added);
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUserList(debouncedSearchString);

  return (
    <Stack>
      <TextInput
        value={searchString}
        onChange={(event) => {
          setSearchString(event.currentTarget.value);
        }}
      />

      {status == "pending" ? (
        <Loader />
      ) : status == "error" ? (
        <Text>{error.message}</Text>
      ) : (
        <ScrollArea h={500} w={"100%"}>
          {data?.pages.map((page, index) => (
            <Fragment key={index}>
              {page?.nodes.map((node) => {
                const isSelected = added.find((e) => e.id == node.id);
                return (
                  <Group key={node.id} mt={"xs"}>
                    <Checkbox
                      checked={isSelected ? true : false}
                      onChange={(event) => {
                        if (event.currentTarget.checked) {
                          addMember(node);
                        } else {
                          removeMember(node);
                        }
                      }}
                    />
                    <Text>
                      {node.firstName} {node.lastName}
                    </Text>

                    <Badge
                      color={
                        node.role == "TEACHER"
                          ? "orange"
                          : node.role == "ADMIN"
                            ? "red"
                            : "blue"
                      }
                    >
                      {node.role}
                    </Badge>
                  </Group>
                );
              })}
            </Fragment>
          ))}

          <Button
            disabled={!hasNextPage}
            loading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            variant="subtle"
            mt={"sm"}
          >
            {hasNextPage ? "Load more" : "End of list"}
          </Button>
        </ScrollArea>
      )}

      <Button onClick={handleDoneClick}>Done</Button>
    </Stack>
  );
}

export default AddClassMemberModal;
