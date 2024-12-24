import { FreelancerWorkModel } from './workTypes';

export interface AdminModel {
  jwt: string;
}

export interface UserModel {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthdate: Date;
  picture: string;
  postCount: 0;
}

export interface BankAccountModel {
  accountNumber: string;
  bank: BankModel;
}

export interface BankModel {
  logo: string;
  bin: string;
  fiName: string;
}

export interface AddressModel {
  id: string;
  customerName: string;
  phoneNumber: string;
  detail: string;
  latitude: string;
  longtitude: string;
  default: boolean;
}
