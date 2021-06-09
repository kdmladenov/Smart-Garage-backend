import nodemailer from "nodemailer";
import * as email from '../../config.js';
var mailingService = function (recipient, subject, text) {
    var transporter = nodemailer.createTransport({
        service: email.EMAIL_SERVICE,
        auth: {
            user: email.EMAIL_USER,
            pass: email.EMAIL_PASSWORD,
        },
    });
    var options = {
        from: email.EMAIL_USER,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbGluZy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL21haWxpbmctc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxLQUFLLEtBQUssTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxJQUFNLGNBQWMsR0FBRyxVQUFDLFNBQWlCLEVBQUUsT0FBZSxFQUFFLElBQVk7SUFDdEUsSUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztRQUM3QyxPQUFPLEVBQUUsS0FBSyxDQUFDLGFBQWE7UUFDNUIsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLEtBQUssQ0FBQyxVQUFVO1lBQ3RCLElBQUksRUFBRSxLQUFLLENBQUMsY0FBYztTQUMzQjtLQUNGLENBQUMsQ0FBQztJQUVILElBQU0sT0FBTyxHQUFHO1FBQ2QsSUFBSSxFQUFFLEtBQUssQ0FBQyxVQUFVO1FBQ3RCLEVBQUUsRUFBRSxTQUFTO1FBQ2IsT0FBTyxTQUFBO1FBQ1AsSUFBSSxNQUFBO0tBQ0wsQ0FBQztJQUVGLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFVBQUMsR0FBRyxFQUFFLElBQUk7UUFDdEMsSUFBSSxHQUFHLEVBQUU7WUFDUCxPQUFPO1NBQ1I7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQVcsSUFBSSxDQUFDLFFBQVUsQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsZUFBZSxjQUFjLENBQUMifQ==