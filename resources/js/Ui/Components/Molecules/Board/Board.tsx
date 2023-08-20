import {Button, Card, CardHeader, Grid, Paper, TextField, Typography} from '@mui/material';
import {Inertia} from "@inertiajs/inertia";
import * as React from 'react'
import {useEffect, useState} from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

//
//
// const Board = ({ project_id, tasks, states}) => {
//     const [title, setTitle] = useState<string>('');
//     const [columns, setColumns] = useState([]);
//
//
//     // const [tasksList, setTasksList] = useState<Array<any>>([]);
//     //
//     useEffect(() => {
//         // setTasksList(tasks);
//         states.map(state => {
//             state.items = tasks.filter(task => task.state_id == state.id);
//         });
//         setColumns(states);
//     });
//
//
//
// //     const handleDragEnd = (result) => {
// //         if (!result.destination) {
// //             return;
// //         }
// // console.log(result);
// //         const reorderedTasks = tasksList;
// //         const [movedTask] = reorderedTasks.splice(result.source.index, 1);
// //         movedTask.state_id = parseInt(result.destination.droppableId.split('_')[1], 10);
// //         reorderedTasks.splice(result.destination.index, 0, movedTask);
// //
// //         console.log(reorderedTasks, movedTask);
// //
// //         // Inertia.post('/tasks/list-update', { 'tasks': reorderedTasks });
// //
// //         setTasksList(reorderedTasks);
// //     };
//     const onDragEnd = (result, columns, setColumns) => {
//         if (!result.destination) return;
//
//         const { source, destination } = result;
//         if (source.droppableId !== destination.droppableId) {
//             const sourceColumn = columns[source.droppableId - 1];
//             const destColumn = columns[destination.droppableId - 1];
//             const sourceItems = [...sourceColumn.items];
//             const destItems = [...destColumn.items];
//             const [removed] = sourceItems.splice(source.index, 1);
//
//             destItems.splice(destination.index, 0, removed);
//
//             let reorderColumns = [...columns];
//             reorderColumns[source.droppableId - 1] = {
//                 ...sourceColumn,
//                 items: sourceItems
//             };
//             reorderColumns[destination.droppableId - 1] = {
//                 ...destColumn,
//                 items: destItems
//             }
//
//             setColumns(reorderColumns);
//             // setColumns({
//             //     ...columns,
//             //     [source.droppableId]: {
//             //         ...sourceColumn,
//             //         items: sourceItems
//             //     },
//             //     [destination.droppableId]: {
//             //         ...destColumn,
//             //         items: destItems
//             //     }
//             // });
//         } else {
//             const column = columns[source.droppableId];
//             const copiedItems = [...column.items];
//             const [removed] = copiedItems.splice(source.index, 1);
//             copiedItems.splice(destination.index, 0, removed);
//             setColumns({
//                 ...columns,
//                 [source.droppableId]: {
//                     ...column,
//                     items: copiedItems
//                 }
//             });
//         }
//     };
//
//
//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//
//         Inertia.post('/tasks', {
//             title,
//             project_id,
//         });
//     };
// console.log(columns);
//     return (
//         <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
//             <Grid container spacing={3}>
//                 {columns.map(column => (
//                     <Grid key={`${column.id}`} item xs={12} sm={4}>
//                         <Paper elevation={3} sx={{ padding: 2, background: "rgba(255, 69, 69, 0.11)" }}>
//                             <Typography variant="h6" gutterBottom>
//                                 {column.label}
//                             </Typography>
//                             <Droppable droppableId={`${column.id}`}>
//                                 {(provided, snapshot) => (
//                                     <div
//                                         {...provided.droppableProps}
//                                         ref={provided.innerRef}
//                                         style={{
//                                             background: snapshot.isDraggingOver
//                                                 ? "lightblue"
//                                                 : "lightgrey",
//                                             padding: 4,
//                                             width: 250,
//                                             minHeight: 500
//                                         }}
//                                     >
//                                         {column.items.map((task, index) => (
//                                             <Draggable
//                                                 key={`task_${task.id}`}
//                                                 draggableId={`task_${task.id}`}
//                                                 index={index}
//                                             >
//                                                 {(provided, snapshot) => (
//                                                     <Card
//                                                         ref={provided.innerRef}
//                                                         {...provided.draggableProps}
//                                                         {...provided.dragHandleProps}
//                                                         sx={{ borderLeft: "10px solid rgb(255, 69, 69)", marginBottom: "5px" }}
//                                                     >
//                                                         <CardHeader title={task.title} />
//                                                     </Card>
//                                                 )}
//                                             </Draggable>
//                                         ))}
//                                         {provided.placeholder}
//                                     </div>
//                                 )}
//                             </Droppable>
//                         </Paper>
//                     </Grid>
//                 ))}
//             </Grid>
//
//             {/* Formulaire pour ajouter une nouvelle tâche */}
//             <Paper elevation={3} sx={{ marginTop: 4, padding: 2 }}>
//                 <form onSubmit={handleSubmit}>
//                     <Typography variant="h6" gutterBottom>
//                         Ajouter une nouvelle tâche
//                     </Typography>
//                     <TextField
//                         value={title}
//                         label="Titre de la tâche"
//                         fullWidth sx={{ marginBottom: 2 }}
//                         onChange={e => setTitle(e.target.value)}
//                     />
//                     <Button type="submit" variant="contained" color="primary">
//                         Ajouter
//                     </Button>
//                 </form>
//             </Paper>
//         </DragDropContext>
//     );
// };
//
// export default Board;

const onDragEnd = (result, columns, setColumns) => {
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
        console.log(destItems);
        console.log(sourceItems);
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

    // Inertia.post('/tasks/list-update', { 'tasks': [] });
};

function Board({ project_id, tasks, states}) {
    const [title, setTitle] = useState<string>('');
    const taskStatus = {};

    useEffect(() => {
        states.map(state => {
            taskStatus[state.value] = state;
            taskStatus[state.value].name = state.label;
            taskStatus[state.value].items = tasks.filter(task => task.state_id == state.id);
        })
    })

    const [columns, setColumns] = useState(taskStatus);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        Inertia.post('/tasks', {
            title,
            project_id,
        });
    };
console.log(columns);
    return (
        <>
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
                                                {column.items.map((item, index) => {
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
        </>
    );
}

export default Board;
