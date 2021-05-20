import jwt from 'jsonwebtoken';
import { PRIVATE_KEY /* , TOKEN_LIFETIME */ } from '../../config.js';
var createToken = function (payload) {
    var token = jwt.sign(payload, PRIVATE_KEY);
    return token;
};
export default createToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2F1dGhlbnRpY2F0aW9uL2NyZWF0ZS10b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxjQUFjLENBQUM7QUFDL0IsT0FBTyxFQUFFLFdBQVcsQ0FBQSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBFLElBQU0sV0FBVyxHQUFHLFVBQUMsT0FBc0Q7SUFDekUsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FDcEIsT0FBTyxFQUNQLFdBQVcsQ0FFWixDQUFDO0lBRUYsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUM7QUFFRixlQUFlLFdBQVcsQ0FBQyJ9