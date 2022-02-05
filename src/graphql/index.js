import { loader } from "graphql.macro";

/* tasks */
const addTask = loader("./task/addtask.graphql");
const getAllTasks = loader("./task/gettasks.graphql");
// const deleteTask = loader("./task/deleteTask.graphql");
const updateTask = loader("./task/updatetask.graphql");

export { getAllTasks,addTask,updateTask };
