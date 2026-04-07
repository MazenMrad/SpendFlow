export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/settings/:path*",
        "/expenses/:path*",
        "/add-expense/:path*",
        "/upcoming-bills/:path*",
        "/account/:path*",
    ],
};
