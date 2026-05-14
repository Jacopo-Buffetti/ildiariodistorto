import { NextResponse } from "next/server";

export interface ApiErrorContract {
  success: false;
  code: string;
  message: string;
  details?: unknown;
}

export function errorResponse(
  status: number,
  code: ApiErrorContract["code"],
  message: string,
  details?: unknown
): NextResponse<ApiErrorContract> {
  const payload: ApiErrorContract =
    details === undefined
      ? { success: false, code, message }
      : { success: false, code, message, details };

  return NextResponse.json(payload, { status });
}

export function internalErrorResponse(err: unknown): NextResponse<ApiErrorContract> {
  const reason = err instanceof Error ? err.message : "Non-Error thrown";
  return errorResponse(500, "INTERNAL_ERROR", "Unexpected server error", {
    reason,
  });
}
