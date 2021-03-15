const path = require("path");
const { google } = require("googleapis");
const MailComposer = require("nodemailer/lib/mail-composer");
const Mail = require("nodemailer/lib/mailer");

const SCOPES = [
  "https://mail.google.com/",
  "https://www.googleapis.com/auth/gmail.labels",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.insert",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.metadata",
  "https://www.googleapis.com/auth/gmail.settings.basic",
  "https://www.googleapis.com/auth/gmail.settings.sharing",
];

const ACCOUNT = "ssong@cinesopa.kr";

const getMessageList = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, "mailer-credentials.json"),
      scopes: SCOPES,
      clientOptions: {
        subject: ACCOUNT,
      },
    });

    const gmail = google.gmail({
      auth,
      version: "v1",
    });

    const msg = new MailComposer({
      from: {
        name: "영화배급협동조합 씨네소파",
        address: "support@cinesopa.kr",
      },
      to: {
        name: "김태훈",
        address: "eszqsc112@naver.com",
      },
      subject: "[테스트 메시지42] 제목입니다.",
      html: "<b>이것은 굵게입2니4다.</b><u></u>",
    });
    const buf = await msg.compile().build();
    const encoded = buf.toString("base64");

    console.log('# CHECK Encoded');
    console.log(encoded);

    const res = await gmail.users.settings.sendAs.list({
      userId: ACCOUNT,
    })
    console.log(res.data);
    // const sendRes = await gmail.users.messages.send({
    //   userId: ACCOUNT,
    //   requestBody: {
    //     raw: encoded,
    //   },
    // });
    // console.log('# res data');
    // console.dir(sendRes.data);

  } catch (e) {
    console.log("# getMessgaeList Failed");
    console.error(e);
  }
};

getMessageList();
