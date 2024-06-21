import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useRecoilState } from "recoil";
import { myUsernameState } from "../states/myUsername";
import { useEffect, useState } from "react";
import { blue } from "@mui/material/colors";

export const MyDialog = (props) => {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const handleAddAccount = () => {
        const username = prompt('username?');
        if (username) {
            const arr = localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : []
            arr.push(username);
            localStorage.setItem('history', arr)
            setList(arr)
        }
        else {
            alert('이름 입력 안했어 다시해')
        }
    }
    

    const [list, setList] = useState([]);
    // useEffect(()=>{
    //     const localstorage = JSON.parse(localStorage.getItem('history'));
    //     if(localstorage){
    //         setList(localstorage)
    //     }
    // })

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Login</DialogTitle>
            <List sx={{ pt: 0 }}>
                {list.map((e) => {
                    return (
                        <ListItem disableGutters key={e}>
                            <ListItemButton onClick={() => handleListItemClick(e)}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                        {/* <PersonIcon /> */}

                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={e} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
                <ListItem disableGutters>
                    <ListItemButton
                        autoFocus
                        onClick={() => handleListItemClick('addAccount')}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                {/* <AddIcon /> */}
                                +
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add account" onClick={handleAddAccount} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}
