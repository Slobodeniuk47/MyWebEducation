// core/entities/userEntity.ts

export interface UserEntity {
  id?: number;
  email: string;
  password?: string | null; //может быть null, если пользователь зашёл через Google.
  name?: string | null;
  googleId?: string | null; //тоже может быть null, если зарегистрировался через email.
  createdAt?: Date; //автоустанавливается PostgreSQL через DEFAULT CURRENT_TIMESTAMP.
  roles?: string[]; // добавим сюда массив названий ролей
}
