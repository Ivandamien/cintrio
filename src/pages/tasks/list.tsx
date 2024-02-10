import {
  KanbanBoard,
  KanbanBoardContainer,
} from "@/components/tasks/kanban/board";
import KanbanColumn from "@/components/tasks/kanban/column";
import KanbanItem from "@/components/tasks/kanban/item";
import { TASKS_QUERY } from "@/graphql/queries";
import { useList } from "@refinedev/core";
import React from "react";

const List = () => {
  const { data: stages, isLoading: isLoadingStages } = useList({
    resource: "stages",
    filters: [
      {
        field: 'title',
        operator: 'in',
        value:['TODO', 'IN PROGRESS', 'IN REVIEW', 'DONE]
      }
    ],
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
  });
  const { data: tasks, isLoading: isLoadingTasks } = useList({
    resource: "tasks",
    sorters: [
      {
        field: "dueDate",
        order: "asc",
      },
    ],
    queryOptions: {
      enabled:!!stages,
    },
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: TASKS_QUERY,
    },
  });

  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unnasignedStage: [],
        stages:[]
      }
    }
  },[stages,tasks])
  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard>
          <KanbanColumn>
            <KanbanItem></KanbanItem>
          </KanbanColumn>
        </KanbanBoard>
      </KanbanBoardContainer>
    </>
  );
};

export default List;
