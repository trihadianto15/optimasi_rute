export interface Location {

  nama: string;

  rt: number;

  rw: number;

  latitude: number;

  longitude: number;

  type?: 'gudang' | 'delivery';

  originalText?: string;
}