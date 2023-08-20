import * as React from 'react';
import {ProjectLayout} from "../../Ui/Layout/ProjectLayout";
import Board from "../../Ui/Components/Molecules/Board/Board";

export const EditProject = ({project, tasks}) => {
    return (
        <ProjectLayout>
            <Board tasks={tasks} project_id={project.id}></Board>
        </ProjectLayout>
    )
}

export default EditProject;