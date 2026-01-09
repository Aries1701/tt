export interface TransportInfo {
  name: string;
  rating: number;
  comment_number: number;
  image_url: string;
}

export interface Trip {
  uuid: string;
  name: string;
  vehicle_name: string;
  vehicle_type: string;
  seat_type: string;
  total_seat: number;
  available_seat: number;
  fare_amount: number;
  discount_amount: number;
  duration_in_min: number;
  departure_date: string;
  departure_time: string;
  drop_off_date: string;
  drop_off_time: string;
  merchant_start_point_name: string;
  merchant_end_point_name: string;
  transport_information: TransportInfo;
}
