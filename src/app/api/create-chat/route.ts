import { loadS3IntoPinecone } from "@/lib/pinecone";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { getS3Url } from "@/lib/s3";

// /api/create-chat
// does this handle all the post requst?
export async function POST(req: Request, res: Response) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      {
        error: "unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log("**** 0. Creating chat for file: ", file_key, file_name);

    await loadS3IntoPinecone(file_key);
    console.log("**** 5.Finish loading PDF into Pinecone");

    const chat_id = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: getS3Url(file_key),
        userId,
      })
      .returning({
        insertedId: chats.id,
      });

    console.log("**** 6.Chat created ", chat_id);

    return NextResponse.json(
      {
        chat_id: chat_id[0].insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
