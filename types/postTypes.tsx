import { AddressModel, UserModel } from './userTypes';
import { WorkModel } from './workTypes';

export type RootStackParamList = {
  UpcomingWork: { status: string };
  PackageWork: { status: string };
  PastWork: { status: string };
  NewPost: { status: string };
  RequestPost: { status: string };
};

export interface ImageModel {
  uri?: string;
  type?: string;
  name?: string;
}

export interface HouseCleaningOption {
  area: number;
  totalFreelancers: number;
  duration: number;
}

export interface Package {
  key: string;
  value: string;
  month: number;
}

export interface CreateTakePostModel {
  id: string;
  freelancerId: string;
  status: string;
}

export interface CreatePostModel {
  name: string;
  description: string;
  address: string;
  price: number;
  gender?: string;
  area: number;
  capacity: number;
  floor: number;
  deposit: number;
  utilities: string;
  interior: string;
  roomType: string;
  postType: string;
  images?: ImageModel[];
}

export interface CreateWorkScheduleModel {
  date: Date;
}

export interface PostModel {
  id: number;
  name: string;
  description: string;
  address: string;
  price: number;
  gender?: string;
  area: number;
  capacity: number;
  floor: number;
  deposit: number;
  utilities: string;
  interior: string;
  roomType: string;
  postType: string;
  postedAt: string;
  postedBy: UserModel;
  pictures: string[];
}

export interface TakePostModel {
  id: string;
  status: string;
  freelancer: UserModel;
  createdAt: number[]; // [Year, Month, Day, Hour, Minute, Second, Millisecond]
  updatedAt: number[];
  post: PostModel;
}

export interface WorkScheduleModel {
  id: string;
  date: number[]; // [Year, Month, Day]
  status: string; // e.g., "INITIAL"
}

export interface HouseCleaningModel {
  area: number;
}

export interface BabysittingModel {
  numOfBaby: number;
  babies: BabyModel[];
}

export interface BabyModel {
  age: number;
}

export interface RoomDetailModel {
  id: number;
  name: string;
  description: string;
  address: string;
  price: number;
  gender?: string;
  area: number;
  capacity: number;
  floor: number;
  deposit: number;
  utilities: string;
  interior: string;
  roomType: string;
  postType: string;
  postedAt: string;
  pictures: string[];
}
