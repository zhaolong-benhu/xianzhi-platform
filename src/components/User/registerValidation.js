import memoize from 'lru-memoize';
import {createValidator, required, minLength,maxLength, mobile,integer} from 'utils/validation';

const registerValidation = createValidator({
  phone: [required, maxLength(11),mobile],
  usercode: [required, minLength(4),maxLength(6)],
  captcha: [required,maxLength(6),integer] // single rules don't have to be in an array
});
export default memoize(10)(registerValidation);
