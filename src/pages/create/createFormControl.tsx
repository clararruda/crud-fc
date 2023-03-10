import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/provider";
import { User } from "../../model/User";
import { createUser } from "../../services/userService";
import { validateCpf } from "../../utils/validateCpf";

interface FormValues {
  name: string;
  email: string;
  login: string;
  phone: string;
  birth: string;
  mother: string;
  status: boolean;
  password: string;
  address: string;
  cpf: string;
  updatedAt: string;
  createdAt: string;
  formSubmitted?: boolean;
  success?: boolean;
}

const initialFormValues: FormValues = {
  name: "",
  email: "",
  login: "",
  phone: "",
  birth: "",
  mother: "",
  status: true,
  password: "",
  address: "",
  cpf: "",
  updatedAt: moment().format("YYYY-MM-DD"),
  createdAt: moment().format("YYYY-MM-DD"),
  formSubmitted: false,
  success: false
};

export const useFormControls = () => {
  const nav = useNavigate();
  const users = useStore();
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openExistError, setOpenExistError] = useState(false);

  const postUser = async (user: any) => {
    delete values.formSubmitted;
    delete values.success;
    createUser(user)
      .then((resp: User) => {
        setOpenSuccess(true);
        setTimeout(() => {
          nav("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error)
        setOpenError(true);
      });
  };

  const checkIfExists = (user: any) => {
    const loginExists = users.find((u: User) => u.login === user.login);
    const cpfExists = users.find((u: User) => u.cpf === user.cpf);
    if (loginExists || cpfExists) {
      setOpenExistError(true);
    } else {
      postUser(user);
    }
  };

  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors };

    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "Campo obrigat??rio";

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "Campo obrigat??rio";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "E-mail inv??lido";
    }

    if ("login" in fieldValues)
      temp.login = fieldValues.login ? "" : "Campo obrigat??rio";

    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Campo obrigat??rio";

    if ("birth" in fieldValues)
      temp.birth = fieldValues.birth ? "" : "Campo obrigat??rio";

    if ("mother" in fieldValues)
      temp.mother = fieldValues.mother ? "" : "Campo obrigat??rio";

    if ("phone" in fieldValues)
      temp.phone = fieldValues.phone ? "" : "Campo obrigat??rio";

    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "Campo obrigat??rio";

    if ("cpf" in fieldValues) {
      temp.cpf = fieldValues.cpf ? "" : "Campo obrigat??rio";
      if (fieldValues.cpf)
        temp.cpf = validateCpf(fieldValues.cpf) ? "" : "CPF inv??lido";
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

  const handleSuccess = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: true
    });
  };

  const handleError = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: false
    });
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
        handleSuccess();
        checkIfExists(values);
      } catch (error) {
        handleError();
      }
    }
  };

  return {
    values,
    errors,
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    openError,
    setOpenError,
    openSuccess,
    setOpenSuccess,
    openExistError,
    setOpenExistError
  };
};
