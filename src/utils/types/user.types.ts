export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer' | 'agent';
  phone?: string;
}


export interface IGetProfile {
  id?: number;
  email?: string;
  phone?: string;
  role?: 'admin' | 'customer' | 'agent';
}