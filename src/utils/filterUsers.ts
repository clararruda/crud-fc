import moment from "moment";
import { User } from "../model/User";

export const byName = (name: string, users: User[]) => {
  return users.filter((user) => user.name.toLowerCase().includes(name));
};

export const byCpf = (cpf: string, users: User[]) => {
  return users.filter((user) => user.cpf.includes(cpf));
};

export const byBirthDate = (birth: string, users: User[]) => {
  return users.filter((user) => user.birth.includes(birth));
};

export const byLogin = (login: string, users: User[]) => {
  return users.filter((user) => user.login.includes(login));
};

export const byStatus = (status: boolean, users: User[]) => {
  return users.filter((user) => user.status === status);
};

export const sortByCreatedAt = (users: User[]) => {
  return users.sort((a, b) => {
    if (moment(a.createdAt).isBefore(moment(b.createdAt))) {
      return 1;
    }
    if (moment(a.createdAt).isAfter(moment(b.createdAt))) {
      return -1;
    }
    return 0;
  });
};

export const sortByUpdatedAt = (users: User[]) => {
  return users.sort((a, b) => {
    if (moment(a.updatedAt).isBefore(moment(b.updatedAt))) {
      return 1;
    }
    if (moment(a.updatedAt).isAfter(moment(b.updatedAt))) {
      return -1;
    }
    return 0;
  });
};

export const byUpdatedAt = (updatedAt: string, users: User[]) => {
  return users.filter((user) => user.updatedAt.includes(updatedAt));
};
