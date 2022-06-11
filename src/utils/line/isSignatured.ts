import crypto from "crypto";
export const isSignatured = (body: any, headers: any) => {
    const signature = crypto
        .createHmac("sha256", process.env["LINE_TOKEN"] || "")
        .update(body)
        .digest("base64");

    const checkHeader = (headers || {})["X-Line-Signature"];

    if (signature === checkHeader) {
        return true;
    } else {
        throw new Error("署名エラー");
    }
};
