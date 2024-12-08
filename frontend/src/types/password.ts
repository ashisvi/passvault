export interface Password {
  _id: string;
  username: string;
  websiteName: string;
  websiteUrl: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePasswordDTO {
  username: string;
  password: string;
  websiteName: string;
  websiteUrl: string;
}

export interface UpdatePasswordDTO {
  username?: string;
  password?: string;
  websiteName: string;
  websiteUrl: string;
}
