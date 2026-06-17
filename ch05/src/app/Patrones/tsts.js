import { of, from } from 'rxjs';
const values = of(1, 2, 3, 4, 5);
values.subscribe(x => console.log(x));

const values2 = from([1, 2, 3, 4, 5]);
values2.subscribe(x => console.log(x));
