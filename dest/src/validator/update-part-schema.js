import { part, carSegments } from '../common/constants.js';
export default {
    name: function (value) { return typeof value === 'undefined' || (typeof value === 'string' && value.length > part.PART_NAME_MIN_LENGTH && value.length < part.PART_NAME_MAX_LENGTH); },
    price: function (value) { return typeof value === 'undefined' || (typeof +value === 'number' && value > part.PART_PRICE_MIN_VALUE && value < part.PART_PRICE_MAX_VALUE); },
    carSegmentId: function (value) { return typeof value === 'undefined' || (typeof +value === 'number' && value > part.CAR_SEGMENT_ID_MIN_VALUE); },
    carSegment: function (value) { return typeof value === 'string' && Object.keys(carSegments).includes(value); },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBhcnQtc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ZhbGlkYXRvci91cGRhdGUtcGFydC1zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUzRCxlQUFlO0lBQ2IsSUFBSSxFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsT0FBTyxLQUFLLEtBQUssV0FBVyxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQW5KLENBQW1KO0lBQzVLLEtBQUssRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFBLE9BQU8sS0FBSyxLQUFLLFdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsb0JBQW9CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUF0SSxDQUFzSTtJQUNoSyxZQUFZLEVBQUUsVUFBQyxLQUFhLElBQUssT0FBQSxPQUFPLEtBQUssS0FBSyxXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEVBQXJHLENBQXFHO0lBQ3RJLFVBQVUsRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFBLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBckUsQ0FBcUU7Q0FDckcsQ0FBQyJ9