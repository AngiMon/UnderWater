import * as React from 'react';
import {Head} from "@inertiajs/react";
import {Card, CardContent, Grid} from '@mui/material';
import Typography from "@mui/material/Typography";
import {ProjectLayout} from "../../Ui/Layout/ProjectLayout";

export const ListProjects = ({projects}) => {
    const [hoveredProjectId, setHoveredProjectId] = React.useState(null);

    return (
        <ProjectLayout>
            <Head title="Projets" />
            <Grid container sx={{marginTop: "16px"}} spacing={2}>
                {projects.map(project => (
                    <Grid item key={project.id} xs={12} sm={6} md={4}>
                        <Card
                            elevation={3}
                            onMouseEnter={() => setHoveredProjectId(project.id)}
                            onMouseLeave={() => setHoveredProjectId(null)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '200px',
                                cursor: 'pointer',
                                transition: 'background-color 1s, color 0.3s',
                                backgroundColor: hoveredProjectId === project.id ? '#ff9e45' : '#fff',
                                color: hoveredProjectId === project.id ? '#fff' : '#000',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ display: hoveredProjectId === project.id ? 'none' : 'block', transition:'display 1s' }}>
                                    {project.title.toUpperCase()}
                                </Typography>
                                <Typography variant="body1" sx={{ display: hoveredProjectId === project.id ? 'block' : 'none' }}>
                                    {project.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </ProjectLayout>
    )
}

export default ListProjects;
