import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/provider";
import { User } from "../../model/User";

interface FormValues {
    login: string;
    password: string;
}

const initialFormValues: FormValues = {
    login: "",
    password: "",
};

export const useFormControls = () => {
    const nav = useNavigate();
    const users = useStore();
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({} as any);
    const [openErrorUser, setOpenErrorUser] = useState(false);
    const [openErrorPass, setOpenErrorPass] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const logUser = async (user: any) => {
        const userExists = users.find((u: User) => u.login === user.login);
        if (userExists && userExists.status) {
            if (userExists.password === user.password) {
                setOpenSuccess(true);
                setTimeout(() => {
                    nav("/userList");
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

        if ("password" in fieldValues)
            temp.password = fieldValues.password ? "" : "Campo obrigatório";

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
        setOpenSuccess
    };
};
