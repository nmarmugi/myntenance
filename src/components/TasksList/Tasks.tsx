import { getOwnTasks, tasksKeys } from "@/services/tasks/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TasksList from "./TasksList";

export default async function Tasks({ projectId }: { projectId: string }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: tasksKeys.lists(),
    queryFn: getOwnTasks,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TasksList projectId={projectId} />
    </HydrationBoundary>
  );
}
