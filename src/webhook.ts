import { LineData, ReceivedEvent } from "./utils/line/lineTypes";
import { sendLineMsg } from "./utils/line/sendLineMessage";
import { isSignatured } from "./utils/line/isSignatured";

export const handler = async function (event: any) {
    console.log(event);
    const { body, headers } = event;
    if (!body || !headers || isSignatured(body, headers)) {
        throw new Error("不正なアクセス");
    }

    if (body.events[0].replyToken === "00000000000000000000000000000000") {
        return {
            statusCode: 200,
            headers: { "X-Line-Status": "OK" },
            body: { result: "connection OK" },
        };
    }

    const receivedEvents = body.events as ReceivedEvent[];
    const receivedText = receivedEvents[0].message.text;

    let sendText = "";

    switch (receivedText) {
        case "捨てたよ！！":
            sendText = "お疲れ様！！えらい！！";
            break;
        case "今日はゴミなし、、":
            sendText = "お疲れ様！！";
            break;
        case "諦めたよ、、":
            sendText = "次がんばろう！！";
            break;
        default:
            sendText = "";
            break;
    }

    if (!sendText) {
        return {
            statusCode: 200,
            body: {},
        };
    }

    const lineData: LineData = {
        type: "reply",
        replyToken: receivedEvents[0].replyToken,
        messages: [
            {
                type: "text",
                text: sendText,
            },
        ],
    };

    await sendLineMsg(lineData);

    return {
        statusCode: 200,
        body: {},
    };
};

if (process.env.NODE_ENV === "test") {
    handler({});
}
