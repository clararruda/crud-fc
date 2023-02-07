import { Button, TextField, Alert, Snackbar } from "@mui/material";
import { FormDialog } from "./dialog/recoverDialog";
import './passRecover.css';
import { useFormControls } from "./passRecoverFormControl";

const inputFieldValues = [
    {
        name: "login",
        label: "Login",
        id: "login"
    },
    {
        name: "cpf",
        label: "CPF",
        id: "cpf"
    },
    {
        name: "birth",
        label: "Data de nascimento",
        id: "birth"
    },
    {
        name: "mother",
        label: "Nome da mãe",
        id: "mother"
    },
]

export const PassRecover = () => {
    const {
        handleInputValue,
        handleFormSubmit,
        errors,
        handleClose,
        open,
        openErrorUser,
        openErrorPass,
        setOpenErrorUser,
        setOpenErrorPass,
        openSuccess,
        setOpenSuccess,
        user
    } = useFormControls();

    return (
        <div className="recoverWrapper">
            <Button onClick={() => window.history.back()} variant="outlined" sx={{ alignSelf: "flex-start" }}>Voltar</Button>
            <h1>Recuperação de senha</h1>
            <span>Insira seus dados corretamente para recuperação</span>
            <div className="recoverForm">
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
                                variant="standard"
                                sx={{ width: "100%", marginBottom: "1rem" }}
                            />
                        );
                    })}
                </form>
            </div>
            <Button onClick={handleFormSubmit} sx={{ width: "170px", alignSelf: "center" }} variant="contained">Validar</Button>
            <Snackbar open={openErrorUser} autoHideDuration={1500}
                onClose={() => setOpenErrorUser(false)}>
                <Alert severity="error"
                    onClose={() => setOpenErrorUser(false)}>Usuário não existe</Alert>
            </Snackbar>
            <Snackbar open={openErrorPass} autoHideDuration={1500}
                onClose={() => setOpenErrorPass(false)}>
                <Alert severity="error"
                    onClose={() => setOpenErrorPass(false)}>Revise os dados, algo está incorreto</Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={1500}
                onClose={() => setOpenSuccess(false)}>
                <Alert severity="success"
                    onClose={() => setOpenSuccess(false)}>Dados validados com sucesso!</Alert>
            </Snackbar>
            <FormDialog open={open} handleClose={handleClose} user={user} />
        </div>
    );
};
