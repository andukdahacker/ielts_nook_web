import { useQuery } from "@tanstack/react-query";
import getAssignmentByExercise from "../network/get_assignment_by_exercise";

function useGetAssignmentByExercise(exerciseId: string) {
  const query = useQuery({
    queryKey: ["assignment", exerciseId],
    queryFn: async () => getAssignmentByExercise(exerciseId),
  });

  return query;
}

export default useGetAssignmentByExercise;
