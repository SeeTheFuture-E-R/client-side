
import { useState, useContext } from "react"
import axios from "axios";
import { AuthContext } from '../context/authContext';
import { Card } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";

function SingleFriend({ friend, friends, setFriends }) {
    let { token } = useContext(AuthContext);

    const deleteFriend = async () => {
        try {
            const res = await axios.delete(`http://localhost:9660/friends/${friend.friendId}`, { headers: { 'Authorization': 'Bearer ' + token } })
            console.log("delete" + friend.friendId)
            let newFriends = friends.filter(x => x.friendId != friend.friendId)
            setFriends(newFriends)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Card>
                <Paper
                    sx={{
                        p: 2,
                        margin: 'auto',
                        maxWidth: 500,
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item>
                            <Box sx={{ width: 300, height: 300 }}>
                                <img style={{ margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%' }}
                                    alt="complex" src={`http://localhost:9660/images/friends/${friend.picturePath}`} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    
                                    <Typography gutterBottom variant="subtitle1" component="div" >
                                        <br />
                                        {friend.name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <DeleteIcon onClick={deleteFriend}></DeleteIcon>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Card>
        </>
    )
}

export default SingleFriend;



