import React from "react";
import styles from "./TaskDetails.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSelectedTask } from "./taskSlice";

type Props = {};

const TaskDetails = () => {
  const selectedTask = useAppSelector(selectSelectedTask);
  return (
    <div className={styles.details}>
      {selectedTask.title && (
        <>
          <h2>{selectedTask.title}</h2>
          <p>Created at</p>
          <h3>{selectedTask.createdAt}</h3>
          <p>Updated at</p>
          <h3>{selectedTask.updatedAt}</h3>
        </>
      )}
    </div>
  );
};

export default TaskDetails;
