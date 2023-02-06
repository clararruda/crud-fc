import { Button, TextField, Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './login.css';
import { useFormControls } from "./loginFormControl";

const inputFieldValues = [
    {
        name: "login",
        label: "Login",
        id: "login"
    },
    {
        name: "password",
        label: "Senha",
        id: "password",
        type: "password"
    }
]

export const Login = () => {
    const nav = useNavigate();
    const {
        handleInputValue,
        handleFormSubmit,
        errors,
        openErrorUser,
        openErrorPass,
        setOpenErrorUser,
        setOpenErrorPass,
        openSuccess,
        setOpenSuccess
    } = useFormControls();

    return (
        <div className="loginWrapper">
            <Button onClick={() => window.history.back()} variant="outlined" sx={{ alignSelf: "flex-start" }}>Voltar</Button>
            <h1>LOGIN</h1>
            <div className="loginForm">
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
                                type={inputFieldValue?.type}
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
            <div className="buttons">
                <Button onClick={() => nav('/')} sx={{ width: "170px", alignSelf: "center" }}>Esqueci a senha</Button>
                <Button onClick={handleFormSubmit} sx={{ width: "170px", alignSelf: "center" }} variant="contained">Login</Button>
            </div>
            <Snackbar open={openErrorUser} autoHideDuration={1500}
                onClose={() => setOpenErrorUser(false)}>
                <Alert severity="error"
                    onClose={() => setOpenErrorUser(false)}>Usuário não existe ou está inativo</Alert>
            </Snackbar>
            <Snackbar open={openErrorPass} autoHideDuration={1500}
                onClose={() => setOpenErrorPass(false)}>
                <Alert severity="error"
                    onClose={() => setOpenErrorPass(false)}>Senha incorreta</Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={1500}
                onClose={() => setOpenSuccess(false)}>
                <Alert severity="success"
                    onClose={() => setOpenSuccess(false)}>Login realizado com sucesso!</Alert>
            </Snackbar>
        </div>
    );
};
