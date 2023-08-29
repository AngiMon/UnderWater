import * as React from 'react';
import {Head} from "@inertiajs/react";
import {Card, CardContent, Grid} from '@mui/material';
import Typography from "@mui/material/Typography";
import ProjectLayout from "@/Ui/Layout/ProjectLayout";
import {FC} from "react";
import {projectProps} from "@/Contracts/interfaces";

type ListProjectsProps = {
    projects: Array<projectProps>
}
export const ListProjects: FC<ListProjectsProps> = ({projects}) => {
    const [hoveredProjectId, setHoveredProjectId] = React.useState<number|null>();

    function handleClick (slug: string) {
        window.location.replace(`/projects/${slug}`)
    }

    return (
        <ProjectLayout>
            <Head title="Projets" />
            <Grid container spacing={2}>
                {
                    0 === projects.length
                        ? <Grid item xs={12} sm={12} md={12} sx={{ display:"flex", justifyContent:"center"}}>
                            <Typography variant="h3" sx={{padding:"15px 20px", border:"3px dashed #ff9e45"}}>
                                Pour commencer, ajoutez un nouveau projet
                            </Typography>
                        </Grid>
                        : projects.map(project => (
                    <Grid item key={project.id} xs={12} sm={6} md={4}>
                        <Card
                            onClick={() => handleClick(project.slug)}
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
                                <Typography variant="h6"
                                            sx={{
                                                letterSpacing: "0.3rem",
                                                display: hoveredProjectId === project.id ? 'none' : 'block',
                                                transition:'display 1s'
                                }}>
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
