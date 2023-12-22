// src/components/TaskBoard.js
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./styles.css";
const initialTasks = {
  todo: [
    { id: "task1", content: "Task 1" },
    { id: "task2", content: "Task 2" },
  ],
  inProgress: [
    { id: "task3", content: "Task 3" },
    { id: "task4", content: "Task 4" },
  ],
  completed: [
    { id: "task5", content: "Task 5" },
    { id: "task6", content: "Task 6" },
  ],
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If the user dropped the item outside of any droppable area
    if (!destination) return;

    // If the user dropped the item back to its original position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Create a copy of the tasks object to avoid mutating state directly
    const newTasks = { ...tasks };

    // Remove the dragged task from its original column
    const sourceColumn = newTasks[source.droppableId];
    const draggedTask = sourceColumn.splice(source.index, 1)[0];

    // Add the dragged task to the destination column
    const destinationColumn = newTasks[destination.droppableId];
    destinationColumn.splice(destination.index, 0, draggedTask);

    // Update state with the new tasks object
    setTasks(newTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board">
        {Object.keys(tasks).map((columnId) => (
          <div key={columnId} className="task-column">
            <h3>{columnId}</h3>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-list"
                >
                  {tasks[columnId].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task-card"
                        >
                          {task.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
