import * as z from 'zod'

(()=>{
  const BaseSchema = z.object({
    id: z.union([z.number().positive(), z.guid()]),
    createdAt: z.date(),
    updatedAt: z.date().max(new Date())
  });

  const ProductSchema = z.object({
    ...BaseSchema.shape,
    title: z.string().min(1).max(100),
    description: z.optional(z.string())
  });

  const ShippingCart = z.array(ProductSchema);

  type Product = z.infer<typeof ProductSchema>;

  const cart = [{
    id: 1,
    title: 'This is a valid title',
    createdAt: new Date(),
    updatedAt: new Date(Date.parse('2004-01-01'))
  }];

  const result = ShippingCart.safeParse(cart);
  if (result.success)
    console.log(result.data);
  else
    console.log(result.error.issues);

});
