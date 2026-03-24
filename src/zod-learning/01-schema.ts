import * as z from 'zod';

(()=>{
  // 1. Define a schema | z.object()
  // 2. Inside, we call zod's methods to define datatypes expected
  const Player = z.object({
    name: z.string(),
    score: z.number()
  });

  // 3. To test if some inputs are valid or not, define two objects
  // one will have the same structure as schema and the other one not
  const realPlayer = {
    name: 'Alan',
    score: 123
  };

  const fakePlayer = {
    name: 245,
    score: 'Hello world'
  };

  // 4. Schema.parse() to test if they're valid
  // If valid, returns a strong-typed copy of the input, otherwise throws an error
  const result = Player.parse(realPlayer);
  console.log(result);

  //const result2 = Player.parse(fakePlayer); // error
  //console.log(result2);
  // 5. to avoid try-catch block we can call parseSafe() instead of parse() and handle the error
  const safeResult = Player.safeParse(fakePlayer);
  if (!safeResult.success)
    console.log(safeResult.error?.issues);
  else
    console.log(safeResult.data);
});
