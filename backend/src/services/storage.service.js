import ImageKit, { toFile } from "@imagekit/nodejs"
import config from "../config/config.js";

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export async function uploadFile({ buffer, fileName }) {
    if (!buffer || !fileName) {
        throw new Error("Buffer or fileName is missing");
    }

    const response = await client.files.upload({
        file: await toFile(buffer),
        fileName: fileName,
        folder: "snitch"
    })

    return response;

}