import { RoleModel } from "./role.model";

export class UserModel {
  id!: number;
  username!: string;
  password!: string;
  role!: RoleModel;
  createdAt!: Date;
  updatedAt!: Date;
}