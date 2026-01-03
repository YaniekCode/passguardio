import { z } from "zod";

const usernameField = z.string()
	.min(3, "Username must be at least 3 characters long.")
	.max(50, "Username cannot be longer than 50 characters.")
	.regex(/^[\p{L}0-9_\- ]+$/u, "Username can contain only letters, numbers, underscores, hyphens and spaces");
const emailField = z.email();
const passwordField = z.string()
	.min(8, "Password must be at least 8 characters long.")
	.max(100, "Password cannot be longer than 100 characters.")
	.refine((val) => !/\s/.test(val), "Password cannot contain whitespace characters (e.g., space, tab).");
const roleField = z.enum(["user", "admin"]);


export const SignupSchema = z.object({
	username: usernameField,
	email: emailField,
	password: passwordField,
	role: roleField,
});

export const LoginSchema = z.object({
	email: emailField,
	password: passwordField,
});
