import * as z from 'zod';
import jwt from 'jsonwebtoken';
import config from '../api-example/config/config.js';
import bcrypt from 'bcrypt';

(async ()=>{
  // Primitive types
  // Schemas from primitive to nested complex structures
  // Primitive
  z.string();
  z.number();
  z.bigint();
  z.boolean();
  z.symbol();
  z.undefined();
  z.null();

  const Profile = z.object({
    firstname: z.string().min(2).max(100),
    lastname: z.string().min(2).max(100).default('Not specified').optional(),
    birthDate: z.date().max(new Date()),
    isActive: z.boolean().default(true).optional()
  });

  type UserProfile = z.infer<typeof Profile>;

  const pf: UserProfile = {
    firstname: "A",
    birthDate: new Date(2034, 4, 13)
  };

  const result = Profile.safeParse(pf);
  if (result.success)
    console.log(result.data);
  else
    console.log(result.error.issues);


  // Coercing
  const regularCoerce = z.coerce.string();
  type RegularInput = z.input<typeof regularCoerce>; // => unknown
  type RegularOutput = z.output<typeof regularCoerce>; // => string

  const customInput = z.coerce.string<string>();
  type CustomInput = z.input<typeof customInput>; // => string
  type CustomOutput = z.output<typeof customInput>; // => string

  // Literals
  const Color = z.literal(["red", "yellow", "blue"]);

  type Color = z.infer<typeof Color>;

  const color: Color = "blue";

  console.log(Color.values);

  // Zod's string built-in validations
  // Validations
  z.string().max(5);
  z.string().min(5);
  z.string().length(5);
  z.string().regex(/^[a-z]+$/);
  z.string().startsWith("aaa");
  z.string().endsWith("zzz");
  z.string().includes("---");
  z.string().uppercase();
  z.string().lowercase();

  // Tranforms
  z.string().trim(); // trim whitespace
  z.string().toLowerCase(); // toLowerCase
  z.string().toUpperCase(); // toUpperCase
  z.string().normalize(); // normalize unicode characters
  // notice that z.string().toLowerCase() is not the same as z.string().lowercase()
  // first validates that the input is in lowercase, while second transform the input to its LowerCase
  console.clear();

  enum Role {
    ADMIN = 'admin',
    CUSTOMER = 'customer'
  }

  const AuthUser = z.object({
    id: z.number(),
    username: z.string().trim().min(4).max(20),
    //role: z.literal(['admin', 'customer'])
    role: z.enum(Role)
  });

  interface AuthUser extends z.infer<typeof AuthUser> {}

  const user = {
    id: 1,
    username: 'alan03',
    role: 'customer'
  };

  // const token = jwt.sign(user, config.mySecret, {expiresIn: '1h'});
  //console.log('your token', token);

  const AccessToken = z.jwt().transform(val => jwt.verify(val, config.mySecret));

  const auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGFuMDMiLCJpYXQiOjE3NzQyMzM4OTAsImV4cCI6MTc3NDIzNzQ5MH0.YCeyxJj9GvOJ3o9GXacxLdQyHEwdAwbFolgGS0O8sK';

  const AuthStringValidator = z.templateLiteral(['Bearer ', z.jwt()]);

  console.log(AuthStringValidator.parse(auth));
  /*
  const access = auth.split(' ')[1];

  const validToken = AccessToken.parse(access);

  const validDecoded = AuthUser.parse(validToken);
  console.log(validDecoded);
  */
  console.log(AuthUser.parse(user));
})();
