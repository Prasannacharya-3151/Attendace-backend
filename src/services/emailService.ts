import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure :false,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendCredentialsEmail(to: string, userId:string, password: string){
    const text = `Your student account has been created.

    UserId:${userId}
    Password: ${password}

    please login nad change your password on first login.`;


    await transporter.sendMail({
        from:`${process.env.FROM_NAME || "Admin"} < $process.env.FROM_EMAIL || process.env.EMAIL_USER}>`,
        to,
        subject:"Your Student Portal Credentials",
        text,
    })
}