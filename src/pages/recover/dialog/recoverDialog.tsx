import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { User } from '../../../model/User';
import { DialogFormControls } from './recoverDialogFormControl';
import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import { updateUser } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';


const inputFieldValues = [
    {
        name: "password",
        label: "Senha",
        id: "password"
    },
    {
        name: "password2",
        label: "Confirme a senha",
        id: "password2"
    },
]

type DialogProps = {
    open: boolean,
    handleClose: () => void,
    user: User | undefined
}

export const FormDialog = ({ open, handleClose, user }: DialogProps) => {
    const nav = useNavigate();
    const [openError, setOpenError] = useState(false);

    const {
        values,
        handleInputValue,
        handleFormSubmit,
        errors,
        openErrorPass,
        setOpenErrorPass,
        openSuccess,
        setOpenSuccess,
    } = DialogFormControls();


    const editUser = async (user: User) => {
        updateUser(user.id, user)
            .then((user: User) => {
                setOpenSuccess(true);
                setTimeout(() => {
                    nav("/login");
                }, 1500);
            })
            .catch((error) => {
                console.log(error);
                setOpenError(true);
            });
    };

    const savePassword = () => {
        let usuario: User | undefined = user;
        if (handleFormSubmit()) {
            if (values.password === values.password2 && values.password.length !== 0) {
                if (values.password.length >= 6) {
                    usuario!.password = values.password;
                    editUser(usuario!);
                } else {
                    setOpenErrorPass(true);
                }
            }
        } else {
            setOpenErrorPass(true);
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Digite a nova senha</DialogTitle>
                <DialogContent>
                    <form autoComplete="off" onSubmit={handleFormSubmit}>
                        {inputFieldValues.map((inputFieldValue, index) => {
                            return (
                                <TextField
                                    key={index}
                                    onChange={handleInputValue}
                                    onBlur={handleInputValue}
                                    name={inputFieldValue.name}
                                    label={inputFieldValue.label}
                                    error={errors[inputFieldValue.name]}
                                    id={inputFieldValue.id}
                                    autoComplete="none"
                                    {...(errors[inputFieldValue.name] && {
                                        error: true,
                                        helperText: errors[inputFieldValue.name]
                                    })}
                                    type="password"
                                    variant="standard"
                                    sx={{ width: "100%", marginBottom: "1rem" }}
                                />
                            );
                        })}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={savePassword}>Salvar</Button>
                </DialogActions>
                <Snackbar open={openErrorPass} autoHideDuration={1500}
                    onClose={() => setOpenErrorPass(false)}>
                    <Alert severity="error"
                        onClose={() => setOpenErrorPass(false)}>As senhas não coincidem ou possuem menos de 6 dígitos</Alert>
                </Snackbar>
                <Snackbar open={openSuccess} autoHideDuration={1500}
                    onClose={() => setOpenSuccess(false)}>
                    <Alert severity="success"
                        onClose={() => setOpenSuccess(false)}>Senha alterada com sucesso!</Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={1500}
                    onClose={() => setOpenError(false)}>
                    <Alert severity="error"
                        onClose={() => setOpenError(false)}>Ocorreu um erro inesperado ao alterar senha!</Alert>
                </Snackbar>
            </Dialog>
        </div>
    );
}