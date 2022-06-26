import { createTransport, SendMailOptions } from 'nodemailer';

type SendEmailOptions = Pick<
    SendMailOptions,
    'attachments' | 'bcc' | 'cc' | 'from' | 'html' | 'replyTo' | 'subject' | 'to'
>;

export const sendEmail = async (options: SendEmailOptions) => {
    const transport = createTransport({
        service: 'Mail.ru',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const { from = process.env.EMAIL_USER, ...mailOptions } = options;

    await transport.sendMail({
        ...mailOptions,
        from
    });
};
