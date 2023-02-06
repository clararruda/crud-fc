import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useFormControls } from "./createFormControl";
import "./create.css";
import moment from "moment";

const inputFieldValues = [
    {
        name: "name",
        label: "Nome",
        id: "name"
    },
    {
        name: "cpf",
        label: "CPF",
        id: "cpf"
    },
    {
        name: "email",
        label: "E-mail",
        id: "email"
    },
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
    },
    {
        name: "birth",
        label: "Data de nascimento",
        id: "birth",
        type: "date",
        defaultValue: moment(new Date()).format("YYYY-MM-DD")
    },
    {
        name: "mother",
        label: "Nome da mãe",
        id: "mother"
    },
    {
        name: "phone",
        label: "Telefone",
        id: "phone"
    },
    {
        name: "address",
        label: "Endereço",
        id: "address"
    }
];

export const Register = () => {
    const {
        handleInputValue,
        handleFormSubmit,
        formIsValid,
        errors,
        openError,
        setOpenError,
        openSuccess,
        setOpenSuccess,
        openExistError,
        setOpenExistError
    } = useFormControls();

    return (
        <div className="registerWrapper">
            <Button onClick={() => window.history.back()} variant="outlined" sx={{ alignSelf: "flex-start" }}>Voltar</Button>
            <h1>Cadastro de usuários</h1>
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
                            defaultValue={inputFieldValue?.defaultValue}
                            variant="outlined"
                            sx={{ width: "100%", marginBottom: "1rem" }}
                        />
                    );
                })}
            </form>
            <Button
                variant="contained"
                type="submit"
                disabled={!formIsValid()}
                onClick={handleFormSubmit}
            >
                Salvar
            </Button>

            <Snackbar open={openError} autoHideDuration={1500}
                onClose={() => setOpenError(false)}>
                <Alert severity="error"
                    onClose={() => setOpenError(false)}>Erro ao cadastrar usuário</Alert>
            </Snackbar>
            <Snackbar open={openExistError} autoHideDuration={1500}
                onClose={() => setOpenExistError(false)}>
                <Alert severity="error"
                    onClose={() => setOpenExistError(false)}>Usuário ou CPF já cadastrados anteriormente</Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={1500}
                onClose={() => setOpenSuccess(false)}>
                <Alert severity="success"
                    onClose={() => setOpenSuccess(false)}>Cadastro realizado com sucesso!</Alert>
            </Snackbar>
        </div>
    );
};
