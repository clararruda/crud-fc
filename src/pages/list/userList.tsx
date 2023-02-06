import { List, ListItem, IconButton, ListItemText, Button, CircularProgress } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import './userList.css';
import { useStore } from "../../context/provider";

export const UserPage = () => {
    const nav = useNavigate();
    const users = useStore();

    return (
        <div className="listWrapper">
            <Button onClick={() => window.history.back()} variant="outlined" sx={{ alignSelf: "flex-start" }}>Voltar</Button>
            <h1>Usuários cadastrados</h1>
            <List sx={{ width: "100%", maxWidth: 360, marginLeft: "50px" }}>
                {users.map((value) => (
                    <ListItem
                        key={value.id}
                        disableGutters
                        secondaryAction={
                            <IconButton onClick={() => nav('/edit', { state: { value } })}>
                                <Edit />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={`${value.name}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};
