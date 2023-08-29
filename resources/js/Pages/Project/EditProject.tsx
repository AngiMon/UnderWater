import * as React from 'react';
import {Button, Paper, TextField, Typography} from "@mui/material";
import {Inertia} from "@inertiajs/inertia";
import {FC, useState} from "react";
import ProjectLayout from "@/Ui/Layout/ProjectLayout";
import Board from "@/Ui/Components/Molecules/Board/Board";
import {projectProps, stateProps, taskProps} from "@/Contracts/interfaces";

export interface EditProjectProps {
    project: projectProps,
    tasks: Array<taskProps>,
    states: Array<stateProps>,
}

export const EditProject: FC<EditProjectProps> = ({project, tasks, states}) => {
    const [title, setTitle] = useState<string>('');
    const [project_id, setProjectId] = useState<number>(project.id);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        Inertia.post('/tasks', {
            title,
            project_id,
        });
    };

    return (
        <ProjectLayout>
            <Board tasks={tasks} states={states} />
            <Paper elevation={3} sx={{ marginTop: 4, padding: 2 }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h6" gutterBottom>
                        Ajouter une nouvelle tâche
                    </Typography>
                    <TextField
                        value={title}
                        label="Titre de la tâche"
                        fullWidth sx={{ marginBottom: 2 }}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Ajouter
                    </Button>
                </form>
            </Paper>
        </ProjectLayout>
    )
}

export default EditProject;