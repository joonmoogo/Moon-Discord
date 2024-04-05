import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';

export default function Right() {
    const list = [
        { src: '/static/images/avatar/1.jpg', name: 'joon' },
        { src: '/static/images/avatar/2.jpg', name: 'jan' },
        { src: '/static/images/avatar/3.jpg', name: 'jin' },
        { src: '/static/images/avatar/4.jpg', name: 'kook' },
        { src: '/static/images/avatar/5.jpg', name: 'cook' },
        { src: '/static/images/avatar/6.jpg', name: 'kang' },
        { src: '/static/images/avatar/7.jpg', name: 'jjan' },
        { src: '/static/images/avatar/8.jpg', name: 'oooo' },
        { src: '/static/images/avatar/8.jpg', name: 'oooo' },
        { src: '/static/images/avatar/8.jpg', name: 'oooo' },
        { src: '/static/images/avatar/8.jpg', name: 'oooo' },
        { src: '/static/images/avatar/8.jpg', name: 'oooo' },
        { src: '/static/images/avatar/8.jpg', name: 'oooo' },
        { src: '/static/images/avatar/8.jpg', name: 'oooo' },
        { src: '/static/images/avatar/8.jpg', name: 'oooo' },
        { src: '/static/images/avatar/8.jpg', name: 'oooo' },
        { src: '/static/images/avatar/8.jpg', name: 'oooo' },
        { src: '/static/images/avatar/8.jpg', name: 'oooo' },
        { src: '/static/images/avatar/8.jpg', name: 'oooo' },
    ]
    return (
        <List sx={{ width: '100%', bgcolor: 'white' ,}} >
            {
                list.map((e) => {
                    return (
                        <>
                            <ListItemButton>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={e.src} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={e.name}
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </ListItemButton>
                        </>
                    )
                })
            }

        </List>


    )
}