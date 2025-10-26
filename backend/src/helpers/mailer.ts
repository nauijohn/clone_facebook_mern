import { google } from "googleapis";
import nodemailer, { TransportOptions } from "nodemailer";

const { OAuth2 } = google.auth;

const oauthLink = "https://developer.google.com/oauthplayground";

const GOOGLE_MAILING_CLIENT_ID = process.env.GOOGLE_MAILING_CLIENT_ID || "";

const GOOGLE_MAILING_CLIENT_SECRET =
  process.env.GOOGLE_MAILING_CLIENT_SECRET || "";

const GOOGLE_MAILING_REFRESH_TOKEN =
  process.env.GOOGLE_MAILING_REFRESH_TOKEN || "";

const EMAIL = process.env.EMAIL || "";

const auth = new OAuth2(
  GOOGLE_MAILING_CLIENT_ID,
  GOOGLE_MAILING_CLIENT_SECRET,
  oauthLink
);

export async function sendVerificationEmail(
  email: string,
  name: string,
  url: string
) {
  auth.setCredentials({
    refresh_token: GOOGLE_MAILING_REFRESH_TOKEN,
  });

  const accessToken = await auth.getAccessToken();

  const stmp = nodemailer.createTransport({
    service: String("gmail") || "",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: GOOGLE_MAILING_CLIENT_ID,
      clientSecret: GOOGLE_MAILING_CLIENT_SECRET,
      refreshToken: GOOGLE_MAILING_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  } as TransportOptions);

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook Clone Email Verification",
    html: "",
  };

  const x = await stmp.sendMail({
    from: EMAIL,
    to: email,
    subject: "Facebook Clone Email Verification",
    html: `<div style=" max-width: 700px; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; font-family: Roboto; font-weight: 600; color: #3b5998; " > <img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width: 30px" /> <span>Action required : Activate your facebook clone account</span> </div> <div style=" padding: 1rem 0; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; color: #141823; font-size: 17px; font-family: Roboto; " > <span>Hello ${name}</span> <div style="padding: 20px 0"> <span style="padding: 1.5rem 0" >You recently created an account on Facebook Clon. To complete your registration, please confirm your account.</span > </div> <a href=${url} style=" width: 200px; padding: 10px 15px; background: #4c649b; color: #fff; text-decoration: none; font-weight: 600; " >Confirm your account</a > <br /> <div style="padding-top: 20px"> <span style="margin: 1.5rem 0; color: #898f9c" >Facebook Clone allows you to stay in touch with all your friends, once registered on Facebook Clone, you can share photos, organize events and much more.</span > </div> </div>`,
  });

  console.log("x: ", x);
}
