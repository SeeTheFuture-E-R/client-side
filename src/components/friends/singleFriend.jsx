
import { useState, useContext } from "react"
import axios from "axios";
import { Button } from '@mui/material';
import { AuthContext } from '../context/authContext';
import { Card } from '@mui/material';
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';


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

    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //         flexGrow: 1,
    //     },
    //     paper: {
    //         padding: theme.spacing(2),
    //         margin: 'auto',
    //         maxWidth: 500,
    //     },
    //     image: {
    //         width: 128,
    //         height: 128,
    //     },
    //     img: {
    //         margin: 'auto',
    //         display: 'block',
    //         maxWidth: '100%',
    //         maxHeight: '100%',
    //     },
    // }));
    // const classes = useStyles();

    return (
        <>
            {/* <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        Standard license
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Full resolution 1920x1080 • JPEG
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        ID: 1030114
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                        Remove
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">$19.00</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div> */}
            <Card>
                {friend.name}
                <br></br>
                {console.log(friend.picturePath)}
                <img src={`http://localhost:9660/images/friends/${friend.picturePath}`} />
                <br />תמונה
                <Button onClick={deleteFriend}>הסר חבר</Button>
            </Card>
        </>
    )
}

export default SingleFriend;

