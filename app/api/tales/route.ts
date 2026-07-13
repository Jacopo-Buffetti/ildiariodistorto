import {NextRequest, NextResponse} from "next/server";
import {
    errorResponse,
    internalErrorResponse,
} from "@/app/api/lib/error-response";
import {getTales, reorderTales} from "@/api/controllers/tales-db";
import getLevel from "@/app/api/auth/authByLevel";

export async function GET(
    req: NextRequest
): Promise<NextResponse> {
    try {
        const url = new URL(req.url);
        const page = Number(url.searchParams.get("page") ?? 1);
        const limit = Number(url.searchParams.get("limit") ?? 25);
        const sort = url.searchParams.get("sortBy") ?? 'createdAt';
        const sortBy = url.searchParams.get("sort") ?? 'asc';
        const tales = await getTales({ page, limit, sortBy, sort });
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

export async function PUT(
    req: NextRequest,
): Promise<NextResponse> {
    try {
        const talesOrder = await req.json() as { id: string, order: number }[];
        if (!talesOrder) {
            return errorResponse(500, "RESOURCE_ERROR", "Could not reorder tales");
        }

        const isAuth = await getLevel(req, "admin");
        if (!isAuth) {
            return errorResponse(401, "UNAUTHORIZED", "You are not authorised");
        }

        const tales = await reorderTales(talesOrder);
        if (!tales) {
            return errorResponse(500, "RESOURCE_ERROR", "Could not reorder tales");
        }
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