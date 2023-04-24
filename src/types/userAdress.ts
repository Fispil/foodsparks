export interface UserAdress {
  town: string,
  street: string,
  build: string,
  apartment: number
}

export interface UserAdressInformation {
  map(arg0: (item: any) => any): unknown
  id: number,
  town: string,
  street: string,
  build: string,
  apartment: number,
  userId: number
}

export interface UserInformation {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  emailConfirmed: boolean,
  phone: string | null,
  birthdate: string | null,
  genderId: number | null,
  roleId: number[]
}