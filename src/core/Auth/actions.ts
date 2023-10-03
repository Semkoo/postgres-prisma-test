"use server";

import prismaORM from "~/prismaORM";
import { UserRegisterValidationSchema, userRegisterSchema } from "./types";
import { hash } from "bcrypt";

export async function signUp(data: UserRegisterValidationSchema): Promise<{
  data: {
    id: string;
    email: string | null;
    name: string | null;
  } | null;
  message: string;
}> {
  const { email, password, verifyPassword } = userRegisterSchema.parse(data);
  if (!email || !password || !verifyPassword || !data.name) {
    return {
      message: "Email and password are required",
      data: null,
    };
  }

  if (password !== verifyPassword) {
    return {
      message: "Passwords do not match",
      data: null,
    };
  }

  const exist = await prismaORM.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    return {
      message: "User already exists",
      data: null,
    };
  }

  const hashedPassword = await hash(verifyPassword, 10);

  const user = await prismaORM.user.create({
    data: {
      email,
      password: hashedPassword,
      name: data.name,
    },
  });

  return {
    message: "Successfully created user",
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}
