import { useState } from "react";
import { useStore } from "../../context/provider";
import { User } from "../../model/User";
import { validateCpf } from "../../utils/validateCpf";

interface FormValues {
    login: string;
    cpf: string;
    mother: string;
    birth: string;
}

const initialFormValues: FormValues = {
    login: "",
    cpf: "",
    mother: "",
    birth: "",
};

export const useFormControls = () => {
    const users = useStore();
    const [user, setUser] = useState<User>();
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({} as any);
    const [openErrorUser, setOpenErrorUser] = useState(false);
    const [openErrorPass, setOpenErrorPass] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logUser = async (user: any) => {
        const userExists = users.find((u: User) => u.login === user.login);
        setUser(userExists);
        if (userExists) {
            if (userExists.cpf === user.cpf && userExists.mother === user.mother && userExists.birth === user.birth) {
                setOpenSuccess(true);
                setTimeout(() => {
                    handleClickOpen();
                }, 1500);
            } else {
                setOpenErrorPass(true);
            }
        } else {
            setOpenErrorUser(true);
        }
    }
    const validate: any = (fieldValues = values) => {
        let temp: any = { ...errors };

        if ("login" in fieldValues)
            temp.login = fieldValues.login ? "" : "Campo obrigatório";

        if ("mother" in fieldValues)
            temp.mother = fieldValues.mother ? "" : "Campo obrigatório";

        if ("birth" in fieldValues)
            temp.birth = fieldValues.birth ? "" : "Campo obrigatório";

        if ("cpf" in fieldValues) {
            temp.cpf = fieldValues.cpf ? "" : "Campo obrigatório";
            if (fieldValues.cpf)
                temp.cpf = validateCpf(fieldValues.cpf) ? "" : "CPF inválido";
        }

        setErrors({
            ...temp
        });
    };

    const handleInputValue = (e: any) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        validate({ [name]: value });
    };

    const formIsValid = (fieldValues = values) => {
        const isValid =
            fieldValues &&
            Object.values(errors).every((x) => x === "");
        return isValid;
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        const isValid = formIsValid();
        if (isValid) {
            try {
                logUser(values);
            } catch (error) {
                console.log(error)
            }
        }
    };

    return {
        values,
        errors,
        handleInputValue,
        handleFormSubmit,
        openErrorUser,
        openErrorPass,
        setOpenErrorUser,
        setOpenErrorPass,
        openSuccess,
        setOpenSuccess,
        open,
        handleClickOpen,
        handleClose,
        user
    };
};
