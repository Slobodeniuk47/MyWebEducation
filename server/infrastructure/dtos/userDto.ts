// server/infrastructure/dtos/userDto.ts
export class UserDto {
  email!: string; // Обязательное поле
  password?: string | null;
  name?: string | null;
  googleId?: string | null;
}