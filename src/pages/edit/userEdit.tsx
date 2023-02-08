import { TextField, Button, FormControlLabel, FormGroup, Switch, Alert, Snackbar, CircularProgress } from "@mui/material";
import { User } from "../../model/User";
import { updateUser } from "../../services/userService";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import './userEdit.css';

export const UserEdit = () => {
    const { state } = useLocation();
    const [user, setUser] = useState<User>(state.value as User);
    const [openError, setOpenError] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    let initialUser: User = state.value as User;

    const checkUpdate = () => {
        if (user !== initialUser) {
            setUser(
                {
                    ...user,
                    updatedAt: new Date().toISOString(),
                }
            );
            editUser();
        }
        else {
            setOpenInfo(true);
            console.log("Não houve alteração");
        }
    }

    const editUser = async () => {
        setLoading(true);
        updateUser(user.id, user)
            .then((user: User) => {
                setLoading(false);
                setUser(user);
                initialUser = user;
                setOpenSuccess(true);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                setOpenError(true);
            });
    };

    const submit = () => {
        checkUpdate();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(
            {
                ...user,
                [event.target.id]: event.target.value,
            }
        );
    };

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(
            {
                ...user,
                status: event.target.checked,
            }
        );
    };

    return (
        <div className="editWrapper">
            <Button onClick={() => window.history.back()} variant="outlined" sx={{ alignSelf: "flex-start" }}>Voltar</Button>
            <h1>Edição do usuário</h1>
            {loading && <CircularProgress sx={{ alignSelf: "center" }} />}
            <FormGroup sx={{ alignSelf: "flex-end" }}>
                <FormControlLabel control={<Switch checked={user.status} onChange={handleSwitch} />} label="Ativo" />
            </FormGroup>
            <TextField
                id="name"
                label="Nome"
                value={user.name}
                variant="filled"
                onChange={handleChange}
            />
            <TextField
                id="cpf"
                label="CPF"
                value={user.cpf}
                variant="filled"
                disabled
            />
            <TextField
                id="email"
                label="E-mail"
                value={user.email}
                variant="filled"
                onChange={handleChange}
            />
            <TextField
                id="login"
                label="Login"
                value={user.login}
                variant="filled"
                onChange={handleChange}
            />
            <TextField
                id="password"
                label="Senha"
                value={user.password}
                variant="filled"
                type={"password"}
                onChange={handleChange}
            />
            <TextField
                id="birth"
                label="Data de nascimento"
                value={user.birth}
                variant="filled"
                onChange={handleChange}
                type="date"
            />
            <TextField
                id="mother"
                label="Nome da mãe"
                value={user.mother}
                variant="filled"
                onChange={handleChange}
            />
            <TextField
                id="phone"
                label="Telefone"
                value={user.phone}
                variant="filled"
                onChange={handleChange}
            />
            <TextField
                id="address"
                label="Endereço"
                value={user.address}
                variant="filled"
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
            />
            <Button onClick={submit} variant="contained">Salvar</Button>
            <Snackbar open={openError} autoHideDuration={1500}
                onClose={() => setOpenError(false)}>
                <Alert severity="error"
                    onClose={() => setOpenError(false)}>Ocorreu um erro inesperado!</Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={1500}
                onClose={() => setOpenSuccess(false)}>
                <Alert severity="success"
                    onClose={() => setOpenSuccess(false)}>Alteração realizada com sucesso!</Alert>
            </Snackbar>
            <Snackbar open={openInfo} autoHideDuration={1500}
                onClose={() => setOpenInfo(false)}>
                <Alert severity="info"
                    onClose={() => setOpenInfo(false)}>Nenhuma alteração realizada.</Alert>
            </Snackbar>
        </div>
    );
};