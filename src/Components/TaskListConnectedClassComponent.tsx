import React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { TaskListClassComponent } from "./TaskListClassComponent";
import { taskType } from "../Redux/Actions/indexAction";

// const mapStatesToProps : MapStateToProps<> =(
//     state : taskType[]
//     ) =>{

// }
const TaskListConnectedClassComponent = connect(

)
(TaskListClassComponent)

export default TaskListConnectedClassComponent;

