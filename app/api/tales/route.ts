import {NextRequest, NextResponse} from "next/server";
import {
    errorResponse,
    internalErrorResponse,
} from "@/app/api/lib/error-response";
import {getTales} from "@/api/controllers/tales-db";

export async function GET(
    req: NextRequest
): Promise<NextResponse> {
    try {
        const url = new URL(req.url);
        const page = Number(url.searchParams.get("page") ?? 1);
        const limit = Number(url.searchParams.get("limit") ?? 25);
        const tales = await getTales({ page, limit });
        if ("error" in tales) {
            return errorResponse(500, "RESOURCE_ERROR", "Could not fetch tales", {
                cause: tales.error,
            });
        }
        return NextResponse.json(tales);
    } catch (err) {
        return internalErrorResponse(err);
    }
}