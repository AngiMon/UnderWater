import * as React from 'react';
import {Grid, Paper, Typography, Button, TextField, Card, CardHeader, CardContent} from '@mui/material';
import {Inertia} from "@inertiajs/inertia";
import {useEffect, useState} from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const Board = ({tasks, project_id}) => {
    const [title, setTitle] = useState<string>('');
    const [tasksList, setTasksList] = useState<Array<any>>([]);

    useEffect(() => {
        setTasksList(tasks);
    })
    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        // Mise à jour de l'ordre des tâches dans la liste tasks
        const reorderedTasks = tasksList;
        const [movedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedTask);
console.log(reorderedTasks);

        // Envoyez les mises à jour au backend si nécessaire
        // Inertia.post('/tasks/list-update', { 'tasks': reorderedTasks });
        // Inertia.put(`/${taskId}`, { 'position': result.destination.index });

        // Mettez à jour l'état avec la nouvelle liste réorganisée
        setTasksList(reorderedTasks);
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        Inertia.post('/tasks', {
            title,
            project_id,
        });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                        <Paper elevation={3} sx={{ padding: 2, background: "rgba(255, 69, 69, 0.11)" }}>
                            <Typography variant="h6" gutterBottom>
                                À faire
                            </Typography>
                            <Droppable
                                droppableId='todo'
                            >
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {tasksList.map((task, index) => (
                                            <Draggable
                                                key={`task_${task.id}`}
                                                draggableId={`task_${task.id}`}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <Card
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        sx={{ borderLeft: "10px solid rgb(255, 69, 69)", marginBottom: "5px" }}
                                                    >
                                                        <CardHeader title={task.title} />
                                                    </Card>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            {/* Insérez ici les composants TaskCard pour les tâches à faire */}
                        </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                        <Paper elevation={3} sx={{ padding: 2, background: "rgba(79, 255, 69, 0.11)" }}>
                        <Typography variant="h6" gutterBottom>
                            En cours
                        </Typography>
                            <Droppable
                                droppableId='in_progress'
                            >
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                            <Draggable
                                                draggableId={"jhg"}
                                                index={1}
                                            >
                                                {(provided) => (
                                                    <Card
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        sx={{ borderLeft: "10px solid rgb(255, 69, 69)", marginBottom: "5px" }}
                                                    >
                                                        <CardHeader title={"bla"} />
                                                    </Card>
                                                )}
                                            </Draggable>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                        <Paper elevation={3} sx={{ padding: 2, background: "rgba(69, 212, 255, 0.11)"}}>
                        <Typography variant="h6" gutterBottom>
                            Terminé
                        </Typography>
                        {/* Insérez ici les composants TaskCard pour les tâches terminées */}
                    </Paper>
                </Grid>
            </Grid>

            {/* Formulaire pour ajouter une nouvelle tâche */}
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
        </DragDropContext>
    );
};

export default Board;
