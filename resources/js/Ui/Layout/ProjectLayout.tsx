import Layout from "./Layout";
import {Box, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import * as React from "react";

export const ProjectLayout = ({ children }) => {
    return (
        <Layout>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {children}
                <SpeedDial
                    FabProps={{ style: { backgroundColor: '#ff9e45' } }}
                    ariaLabel="tools"
                    sx={{ position: 'absolute', bottom: 80, right: 80 }}
                    icon={<SpeedDialIcon />}
                    direction="up"
                >
                    <SpeedDialAction
                        key={'List'}
                        icon={<ListAltIcon />}
                        tooltipTitle="Liste"
                        onClick={() => window.location.replace('/projects')}
                    />
                    <SpeedDialAction
                        key={'Add'}
                        icon={<NoteAddIcon />}
                        tooltipTitle="Créer"
                        onClick={() => window.location.replace('/projects/add')}
                    />
                </SpeedDial>
            </Box>
        </Layout>
    )
}
