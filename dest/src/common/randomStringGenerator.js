var randomStringGenerator = function (length, initialValue, inOptions) {
    if (initialValue === void 0) { initialValue = ''; }
    if (inOptions === void 0) { inOptions = 'abcdefghijklmnopqrstuvwxyz0123456789'; }
    var outString = initialValue;
    for (var i = 0; i < length; i++) {
        outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    return outString;
};
export default randomStringGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tU3RyaW5nR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9yYW5kb21TdHJpbmdHZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTSxxQkFBcUIsR0FBRyxVQUFDLE1BQWMsRUFBRSxZQUFpQixFQUFFLFNBQTBEO0lBQTdFLDZCQUFBLEVBQUEsaUJBQWlCO0lBQUUsMEJBQUEsRUFBQSxrREFBMEQ7SUFDMUgsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDO0lBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDL0IsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDN0U7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFFRixlQUFlLHFCQUFxQixDQUFDIn0=