export interface Password {
  id: string;
  title: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePasswordDTO {
  title: string;
  username: string;
  password: string;
}

export interface UpdatePasswordDTO {
  title?: string;
  username?: string;
  password?: string;
}
