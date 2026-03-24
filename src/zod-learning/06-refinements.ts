import * as z from 'zod';
import { es } from 'zod/locales';

(()=>{
  // schema.refine() allows us to define constraints which zod Api does not provide
  const esNumeroPrimo = (n: number): boolean => {
    let divisors = 0;
    for (let i = 2; i < n - 1; i++)
      if (n % i === 0)
        divisors++;
    return divisors === 0;
  }

  //console.log(esNumeroPrimo(4));

  const NumeroPrimo =
    z.coerce.number<string>().min(1).refine(val => esNumeroPrimo(val), {error: 'No es un numero primo'});

  type i = z.input<typeof NumeroPrimo>;

  const result = NumeroPrimo.safeParse(101);
  if (result.success)
    console.log(result.data);
  else
    console.log(result.error.issues);
})();
