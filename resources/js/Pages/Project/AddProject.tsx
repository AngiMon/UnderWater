import * as React from 'react';
import {useState} from "react";
import { Inertia } from '@inertiajs/inertia';
import {TextField, Button, Paper, Grid} from '@mui/material';
import ProjectLayout from "../../Ui/Layout/ProjectLayout";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

interface AddProjectProps {}

const AddProject: React.FC<AddProjectProps> = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        Inertia.post('/projects', {
            title,
            description,
        });

        setTimeout(() => {
            return window.location.replace('/projects')
        }, 2000);
    };

    return (
        <ProjectLayout>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', backgroundColor: '#ff9e45', color: '#fff' }}>
                <Typography variant="h5" gutterBottom>
                    Ajouter un Projet
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Titre"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                                InputProps={{ style: { backgroundColor: '#fff' } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                                InputProps={{ style: { backgroundColor: '#fff' } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                sx={{ backgroundColor: '#fff', color: '#ff9e45' }}
                            >
                                Créer le Projet
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </ProjectLayout>
    );
};

export default AddProject;
