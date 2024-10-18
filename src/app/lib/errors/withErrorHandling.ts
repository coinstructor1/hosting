import { NextRequest, NextResponse } from 'next/server';
import { HttpError } from './apiErrors';

type Handler = (req: NextRequest) => Promise<NextResponse>;

export function withErrorHandling(handler: Handler): Handler {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error: unknown) {
      console.error('error in api route', error);

      if (error instanceof HttpError) {
        return NextResponse.json(
          { error: error.message },
          { status: error.statusCode }
        );
      } else {
        return NextResponse.json(
          { error: 'internal server error' },
          { status: 500 }
        );
      }
    }
  };
}
