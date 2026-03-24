import * as z from 'zod'

(()=>{
  const Cat = z.object({
    name: z.string()
  });

  const uid = z.string().length(64);
  // schema.shape to access into the internal schema
  Cat.shape.name;
  Cat.keyof();

  const PersonSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.date().max(new Date()),
    email: z.email()
  });

  // extends from an existing schema, even u can override schemas
  const StudentSchema = PersonSchema.extend({
    career: z.string(),
    activeCourses: z.array(z.string())
    //email: z.number()
  });

  type Student = z.infer<typeof StudentSchema>;
  // but it's recommended to do it this other way (more according to js sintaxis)
  const ProffesorSchema = z.object({
    ...PersonSchema.shape,
    degree: z.string()
  });

  type Professor = z.infer<typeof ProffesorSchema>;
  // Pick, omit, partial, required methods inspired on ts utility types
  const UpdateStudenteDtoSchema = StudentSchema.pick({
    firstName: true,
    lastName: true
  });

  const UpdateProffesorDtoSchema = ProffesorSchema.omit({
    degree: true,
    birthDate: true
  });

  const ProffessorOptional = ProffesorSchema.partial();
  type p = z.infer<typeof ProffessorOptional>;

  const ProffesorRequired = ProffessorOptional.required();
  type r = z.infer<typeof ProffesorRequired>;


})
