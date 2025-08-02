export interface ICreateParcel {
  sender_name: string;
  sender_phone: string;
  receiver_name: string;
  receiver_phone: string;

  pickup_address: string;
  delivery_address: string;

  pickup_latitude: number;
  pickup_longitude: number;
  delivery_latitude: number;
  delivery_longitude: number;

  parcel_weight: number;
  parcel_description: string;
  parcel_type: 'fragile' | 'documents' | 'electronics' | 'clothing' | 'food' | 'other';

  payment_mode: 'cod' | 'prepaid';
  amount: number;
  is_paid: boolean;
}


export interface IParcel {
  sender_name: string;
  sender_phone: string;
  receiver_name: string;
  receiver_phone: string;

  pickup_address: string;
  delivery_address: string;

  pickup_latitude: number;
  pickup_longitude: number;
  delivery_latitude: number;
  delivery_longitude: number;

  parcel_weight: number;
  parcel_description: string;
  parcel_type: 'fragile' | 'documents' | 'electronics' | 'clothing' | 'food' | 'other';

  payment_mode: 'cod' | 'prepaid';
  status: 'PENDING' | 'PICKED UP' | 'IN TRANSIT' | 'DELIVERED' | 'FAILED';
  amount: number;
  is_paid: boolean;
}


export interface IParcelStatusLogs{
  parcel_id: number;
  status: 'PENDING' | 'PICKED UP' | 'IN TRANSIT' | 'DELIVERED' | 'FAILED';
  updated_at: Date
  note: string,
  updated_by?:number
}