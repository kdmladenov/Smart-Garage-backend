import { visit } from '../common/constants.js';
export default {
    notes: function (value) { return typeof value === 'string' && value.length > visit.NOTES_MIN_LENGTH && value.length < visit.NOTES_MAX_LENGTH; },
    vehicleId: function (value) { return value > 0; },
    usedParts: function (value) { return Array.isArray(value) && Object.values(value).map(function (p) { return p.partId > 0 && p.partQty > 0 && p.price > 0; }).every(function (b) { return b === true; }); },
    performedServices: function (value) { return Array.isArray(value) && Object.values(value).map(function (s) { return s.serviceId > 0 && s.serviceQty > 0 && s.price > 0; }).every(function (b) { return b === true; }); },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXZpc2l0LXNjaGVtYSBjb3B5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ZhbGlkYXRvci9jcmVhdGUtdmlzaXQtc2NoZW1hIGNvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRS9DLGVBQWU7SUFDYixLQUFLLEVBQUUsVUFBQyxLQUFhLElBQUssT0FBQSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsZ0JBQWdCLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsZ0JBQWdCLEVBQTNHLENBQTJHO0lBQ3JJLFNBQVMsRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFBLEtBQUssR0FBRyxDQUFDLEVBQVQsQ0FBUztJQUN2QyxTQUFTLEVBQUUsVUFBQyxLQUF5RCxJQUFLLE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLElBQUksRUFBVixDQUFVLENBQUMsRUFBMUgsQ0FBMEg7SUFDcE0saUJBQWlCLEVBQUUsVUFBQyxLQUErRCxJQUFLLE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFsRCxDQUFrRCxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLElBQUksRUFBVixDQUFVLENBQUMsRUFBaEksQ0FBZ0k7Q0FDek4sQ0FBQyJ9