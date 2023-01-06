import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAsyncTasks, selectTasks } from "./taskSlice";
import { fetchAsyncProfile } from "../login/loginSlice";
import styles from "./TaskList.module.css";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTaskProfile = async () => {
      await dispatch(fetchAsyncTasks());
      await dispatch(fetchAsyncProfile());
    };
    fetchTaskProfile();
  }, [dispatch]);

  return (
    <div>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
