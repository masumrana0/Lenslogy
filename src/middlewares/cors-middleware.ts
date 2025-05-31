import { NextRequest, NextResponse } from "next/server";

export function corsMiddleware(request: NextRequest, response?: NextResponse) {
  // Create response if not provided
  const res = response || NextResponse.next();

  // Get the origin from the request headers
  const origin = request.headers.get("origin") || "";

  // Define allowed origins for your domain
  const allowedOrigins = [
    "https://lenslogy.com",
    "https://www.lenslogy.com",
    "http://localhost:3000",
    "http://localhost:3001",
  ];

  // Check if the origin is allowed
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Set CORS headers
  res.headers.set(
    "Access-Control-Allow-Origin",
    isAllowedOrigin ? origin : "*"
  );
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept, Origin"
  );
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Max-Age", "86400"); // 24 hours

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: res.headers,
    });
  }

  return res;
}
