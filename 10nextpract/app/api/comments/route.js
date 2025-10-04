import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const url = new URL(request.url);
  const postId = url.searchParams.get("postId");

  if (postId) {
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(comments);
  }

  const allComments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(allComments);
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body || !body.postId || !body.text) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newComment = await prisma.comment.create({
      data: {
        postId: String(body.postId),
        text: body.text.trim(),
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (err) {
    console.error("POST /api/comments error:", err);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
