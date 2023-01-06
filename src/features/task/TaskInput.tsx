import React, { ChangeEvent } from "react";
import styled from "./TaskInput.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createAsyncTask,
  editTask,
  fetchAsyncTasks,
  selectEditedTask,
  updateAsyncTask,
} from "./taskSlice";
import { Button } from "@material-ui/core";

const TaskInput = () => {
  const dispatch = useAppDispatch();
  const editedTask = useAppSelector(selectEditedTask);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editedTask.id === 0
      ? dispatch(
          editTask({
            id: 0,
            title: e.target.value,
            createdAt: "",
            updatedAt: "",
          })
        )
      : dispatch(
          editTask({
            id: editedTask.id,
            title: e.target.value,
            createdAt: editedTask.createdAt,
            updatedAt: editedTask.updatedAt,
          })
        );
  };

  const isDisabled = editedTask.title.length === 0;

  const createClicked = () => {
    dispatch(createAsyncTask(editedTask));
    dispatch(editTask({ id: 0, title: "", createdAt: "", updatedAt: "" }));
  };

  const updateClicked = () => {
    dispatch(updateAsyncTask(editedTask));
    dispatch(editTask({ id: 0, title: "", createdAt: "", updatedAt: "" }));
  };

  return (
    <div>
      <input
        type="text"
        className={styled.taskInput}
        value={editedTask.title}
        onChange={(e) => handleInputChange(e)}
        placeholder="Please input task"
      />

      <div className={styled.switch}>
        {editedTask.id === 0 ? (
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={createClicked}
            color="primary"
          >
            Create
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={updateClicked}
            color="primary"
          >
            Update
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskInput;
