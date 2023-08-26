import {Card, CardHeader, Grid, Paper, Typography} from '@mui/material';
import {Inertia} from "@inertiajs/inertia";
import * as React from 'react'
import {FC, useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import {stateProps, taskProps} from "@/Pages/Project/EditProject";

export interface BoardProps {
    tasks: Array<taskProps>,
    states: Array<stateProps>
}

export interface TaskStatusProps {
    id: number,
    items: Array<taskProps>,
    name: string
}

const onDragEnd = (result: DropResult, columns:any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);

        removed.state_id = destColumn.id;
        destItems.splice(destination.index, 0, removed);
        destItems.map((item, index) => item.position = index);
        sourceItems.map((item, index) => item.position = index);

        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });

        Inertia.post('/tasks/list-update', { 'tasks': sourceItems.concat(destItems) });

    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        copiedItems.map((item, index) => item.position = index);

        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });

        Inertia.post('/tasks/list-update', { 'tasks': copiedItems });
    }
};

const Board: FC<BoardProps> = ({ tasks, states}) => {
    const [columns, setColumns] = useState<Record<string, TaskStatusProps>>({});
    useEffect(() => {
        const updatedColumn: Record<string, TaskStatusProps> = {};

        states.forEach(state => {
            updatedColumn[state.value] = {
                id: state.id,
                name: state.label,
                items: tasks.filter(task => task.state_id === state.id),
            };
        });

        setColumns(updatedColumn);
    }, [states, tasks]);

    return (
        <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
            <Grid container spacing={3}>
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <Grid key={`${columnId}`} item xs={12} sm={4}>
                            <Paper elevation={3} sx={{ padding: 2, background: "rgba(255, 69, 69, 0.11)" }}>
                                <Typography variant="h6" gutterBottom>
                                    {column.name}
                                </Typography>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {column.items.map((item: taskProps, index: number) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={JSON.stringify(item.id)}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <Card
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        sx={{ borderLeft: "10px solid rgb(255, 69, 69)", marginBottom: "5px" }}
                                                                    >
                                                                        <CardHeader title={item.title} />
                                                                    </Card>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </DragDropContext>
    );
}

export default Board;
