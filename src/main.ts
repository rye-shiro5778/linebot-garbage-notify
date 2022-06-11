import dayjs from "dayjs";
import { LineData } from "./utils/line/lineTypes";
import { sendLineMsg } from "./utils/line/sendLineMessage";
import { getGarbage } from "./utils/getGarbage";
import { getLineTargets } from "./utils/line/getLineTargets";
import "dayjs/locale/ja";

export const handler = async function (event: any) {
    const targets = getLineTargets();

    if (!targets) {
        return;
    }

    // lambda上では9時間の時差
    const now = dayjs().add(9, "h");
    const garbage = getGarbage(now);

    const messages = garbage
        ? [
              {
                  type: "text",
                  text: `今日は「${garbage}」のゴミ捨てにいくんだ！！`,
                  quickReply: {
                      items: [
                          {
                              type: "action",
                              action: {
                                  type: "message",
                                  label: "捨てたよ！！",
                                  text: "捨てたよ！！",
                              },
                          },
                          {
                              type: "action",
                              action: {
                                  type: "message",
                                  label: "今日はゴミなし、、",
                                  text: "今日はゴミなし、、",
                              },
                          },
                          {
                              type: "action",
                              action: {
                                  type: "message",
                                  label: "諦めたよ、、",
                                  text: "諦めたよ、、",
                              },
                          },
                      ],
                  },
              },
          ]
        : [
              {
                  type: "text",
                  text: `今日はゴミ捨てはありません！`,
              },
          ];

    const lineData: LineData = {
        type: "multicast",
        to: targets,
        messages,
    };

    await sendLineMsg(lineData);
    return;
};

if (process.env.NODE_ENV === "test") {
    handler({});
}
