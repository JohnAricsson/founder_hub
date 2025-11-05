import { NextResponse } from "next/server";
import { WriteClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    // Fetch current view count
    const doc = await client.fetch(
      `*[_type=="startup" && _id==$id][0]{_id, view}`,
      { id }
    );

    if (!doc) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    const currentView = doc.view ?? 0;

    // Patch and commit
    const updatedDoc = await WriteClient.patch(id)
      .set({ view: currentView + 1 })
      .commit();

    return NextResponse.json({ view: updatedDoc.view ?? currentView + 1 });
  } catch (err) {
    console.error("Failed to update view:", err);
    return NextResponse.json(
      { error: "Failed to update view" },
      { status: 500 }
    );
  }
}
