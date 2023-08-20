import * as React from 'react';
import {ProjectLayout} from "../../Ui/Layout/ProjectLayout";
import Board from "../../Ui/Components/Molecules/Board/Board";

export const EditProject = ({project, tasks, states}) => {
    return (
        <ProjectLayout>
            <Board project_id={project.id} tasks={tasks} states={states}></Board>
        </ProjectLayout>
    )
}

export default EditProject;