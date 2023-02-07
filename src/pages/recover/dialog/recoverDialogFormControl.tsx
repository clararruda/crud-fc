import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../context/provider";

interface FormValues {
    password: string;
    password2: string;
}

const initialFormValues: FormValues = {
    password: "",
    password2: "",
};

export const DialogFormControls = () => {
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({} as any);
    const [openErrorPass, setOpenErrorPass] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);


    const validate: any = (fieldValues = values) => {
        let temp: any = { ...errors };

        if ("password" in fieldValues)
            temp.password = fieldValues.password ? "" : "Campo obrigatório";

        if ("password2" in fieldValues)
            temp.password2 = fieldValues.password2 ? "" : "Campo obrigatório";

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

    const handleFormSubmit = () => {
        const isValid = formIsValid();
        if (isValid) {
            return true;
        }
        else return false;
    };

    return {
        values,
        errors,
        handleInputValue,
        handleFormSubmit,
        openErrorPass,
        setOpenErrorPass,
        openSuccess,
        setOpenSuccess,
    };
};
