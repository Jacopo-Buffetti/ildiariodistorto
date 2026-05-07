/**
 * @swagger
 *  /api/auth/register:
 *    tags:
 *      - user
 *    post:
 *      summary: Create user.
 *      description: Create user using email and password.
 *      parameters:
 *        - in: query
 *          name: email
 *          schema:
 *            type: string
 *          description: The email of user you want register.
 *        - in: query
 *          name: password
 *          schema:
 *            type: string
 *          description: The email of user you want register.
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   avatar:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *                   role:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */

import { NextRequest, NextResponse } from "next/server";

import { createUser } from "@/api/controllers/backend/user-db";
import { CreateUserSchema } from "@/schemas/user";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    body.role = "6551f7cc8f006751fc52a52b";
    const parsed = CreateUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues, success: false },
        { status: 400 }
      );
    }
    const user = await createUser(parsed.data);

    if ("error" in user) {
      return NextResponse.json({ ...user, success: false }, { status: 500 });
    }
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
