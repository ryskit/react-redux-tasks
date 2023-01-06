import React, { FC } from "react";
import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import styles from "./TaskItem.module.css";
import {
  Task,
  deleteAsyncTask,
  editTask,
  selectEditedTask,
  selectTask,
} from "./taskSlice";
import { useAppDispatch } from "../../app/hooks";
import { Button } from "@material-ui/core";

type Props = {
  task: Task;
};

const TaskItem: FC<Props> = (props) => {
  const { task } = props;
  const dispatch = useAppDispatch();

  return (
    <li className={styles.listItem}>
      <span
        className={styles.cursor}
        onClick={() => dispatch(selectTask(task))}
      >
        {task.title}
      </span>
      <div>
        <Button
          onClick={() => dispatch(editTask(task))}
          className={styles.taskIcon}
        >
          <FaEdit />
        </Button>
        <Button
          onClick={() => dispatch(deleteAsyncTask(task.id))}
          className={styles.taskIcon}
        >
          <BsTrash />
        </Button>
      </div>
    </li>
  );
};

export default TaskItem;
