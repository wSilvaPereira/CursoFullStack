import { Library } from 'ffi';
import { refType } from 'ref';

const charPointer = ref.refType('char');
export default Library('toto.dll', {
  toto_foo: ['int', ['int', 'int']],
  toto_bar: ['void', [charPointer]],
});
