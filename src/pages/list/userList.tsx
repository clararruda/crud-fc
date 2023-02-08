import { List, ListItem, IconButton, ListItemText, Button, MenuItem, TextField, Select, SelectChangeEvent, FormControl, InputLabel } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import './userList.css';
import { useStore } from "../../context/provider";
import { useState } from "react";
import { byCpf, byLogin, byName, byStatus, sortByCreatedAt, sortByUpdatedAt } from "../../utils/filterUsers";
import SearchIcon from '@mui/icons-material/Search';
import { User } from "../../model/User";

const filters = [
    {
        value: 'login',
        label: 'Login',
    },
    {
        value: 'name',
        label: 'Nome',
    },
    {
        value: 'cpf',
        label: 'CPF',
    },
    {
        value: "ativo",
        label: 'Status Ativo',
    },
    {
        value: "inativo",
        label: 'Status Inativo',
    },
    {
        value: 'createdAt',
        label: 'Inserção',
    },
    {
        value: 'updatedAt',
        label: 'Atualização',
    }
];

export const UserPage = () => {
    const nav = useNavigate();
    const u = useStore();
    const [users, setUsers] = useState<User[]>(byStatus(true, u));
    const [searchFilter, setSearchFilter] = useState<string>("");
    const [actualFilter, setActualFilter] = useState<string>("");
    const handleFilterChanges = (event: SelectChangeEvent) => {
        setActualFilter(event.target.value as string);
    }

    const handleSearchChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchFilter(event.target.value);
    }

    const doChanges = () => {
        if (actualFilter === "login") {
            let search = byLogin(searchFilter, u);
            setUsers(search);
        }
        else if (actualFilter === "cpf") {
            let search = byCpf(searchFilter, u);
            setUsers(search);
        }
        else if (actualFilter === "ativo") {
            let search = byStatus(true, u);
            setUsers(search);
        }
        else if (actualFilter === "inativo") {
            let search = byStatus(false, u);
            setUsers(search);
        }
        else if (actualFilter === "name") {
            let search = byName(searchFilter, u);
            setUsers(search);
        }
        else if (actualFilter === "createdAt") {
            let search = sortByCreatedAt(u);
            setUsers(search);
        }
        else if (actualFilter === "updatedAt") {
            let search = sortByUpdatedAt(u);
            setUsers(search);
        }
    }

    return (
        <div className="listWrapper">
            <Button onClick={() => window.history.back()} variant="outlined" sx={{ alignSelf: "flex-start" }}>Sair</Button>
            <h1>Usuários cadastrados</h1>
            <div className="filterWrapper">
                <TextField
                    id="searchFilter"
                    label="Busca"
                    variant="standard"
                    value={searchFilter}
                    onChange={handleSearchChanges}
                    sx={{ width: "40%" }}
                />
                <FormControl sx={{ width: "30%" }}>
                    <InputLabel id="inputLabel">Filtrar por</InputLabel>
                    <Select
                        labelId="inputLabel"
                        id="filterSelect"
                        value={actualFilter}
                        label="Filtrar por"
                        defaultValue="ativo"
                        onChange={handleFilterChanges}
                        variant="standard"
                    >
                        {filters.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <IconButton onClick={doChanges} sx={{ width: "10%" }}>
                    <SearchIcon />
                </IconButton>
            </div>
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
