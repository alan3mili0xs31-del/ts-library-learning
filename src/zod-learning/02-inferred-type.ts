import * as z from 'zod';

(()=>{
  // Inferred types
  // We can define a type based on the schema created
  const user = z.object({
    //username: z.string().min(1).max(100).transform(val => val.toLowerCase()),
    username: z.string().toLowerCase().min(1).max(100),
    password: z.string().min(10).max(20),
    role: z.literal(['admin', 'customer', 'seller'], {error: 'Role is not valid'})
  });

  type User = z.infer<typeof user>;

  interface AuthUser extends User {}

  // notice how it doesn't matter if we passed another type to be parse
  // and just take on account those properties which are match with the schema
  const newUser: AuthUser = {
    username: 'ALAdd01',
    password: 'd12345671234567890qw',
    role: 'admin'
  };

  const result = user.parse(newUser);
  console.log(result);

  // Input type and output can diverge
  const ID = z.number().transform((val => val.toString()));

  type IDi = z.input<typeof ID>;
  type IDo = z.output<typeof ID>;

  const data: IDi = 1234;
  const result2: IDo = ID.parse(data);
  console.log(result2);

});
