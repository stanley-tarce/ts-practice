import { object, string, TypeOf } from "zod";
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required'
    }),
    password: string({
      required_error: 'Password is required'
    }).min(6, 'Password too short — should be 6 chars minimum'),
    password_confirmation: string({
      required_error: 'Password Confirmation is required'
    }).min(6,'Password Confirmation too short — should be 6 chars minimum'),
    email: string({
      required_error: 'Email is required'
    }).email('Not a valid email')
  }).refine(function (data) {
    return data.password === data.password_confirmation
  },{
    message: 'Passwords do not match',
    path: ['passwordConfirmation'] 
  })
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>,'body.password_confirmation'>;
