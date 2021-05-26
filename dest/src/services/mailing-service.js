import nodemailer from "nodemailer";
import { email } from '../common/constants.js';
var mailingService = function (recipient, subject, text) {
    var transporter = nodemailer.createTransport({
        service: email.emailService,
        auth: {
            user: email.emailUser,
            pass: email.emailPassword,
        },
    });
    var options = {
        from: email.emailUser,
        to: recipient,
        subject: subject,
        text: text,
    };
    transporter.sendMail(options, function (err, info) {
        if (err) {
            return;
        }
        console.log("Sent: + " + info.response);
    });
};
export default mailingService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbGluZy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL21haWxpbmctc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRS9DLElBQU0sY0FBYyxHQUFHLFVBQUMsU0FBaUIsRUFBRSxPQUFlLEVBQUUsSUFBWTtJQUN0RSxJQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDO1FBQzdDLE9BQU8sRUFBRSxLQUFLLENBQUMsWUFBWTtRQUMzQixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVM7WUFDckIsSUFBSSxFQUFFLEtBQUssQ0FBQyxhQUFhO1NBQzFCO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsSUFBTSxPQUFPLEdBQUc7UUFDZCxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVM7UUFDckIsRUFBRSxFQUFFLFNBQVM7UUFDYixPQUFPLFNBQUE7UUFDUCxJQUFJLE1BQUE7S0FDTCxDQUFDO0lBRUYsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSTtRQUN0QyxJQUFJLEdBQUcsRUFBRTtZQUNQLE9BQU87U0FDUjtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBVyxJQUFJLENBQUMsUUFBVSxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixlQUFlLGNBQWMsQ0FBQyJ9