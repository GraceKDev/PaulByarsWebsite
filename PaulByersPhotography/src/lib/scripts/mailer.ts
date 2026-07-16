import nodemailer from 'nodemailer';

type MailerEnv = {
	SMTP_HOST?: string;
	SMTP_PORT?: string;
	SMTP_SECURE?: string;
	SMTP_USER?: string;
	SMTP_PASS?: string;
	MAIL_TO?: string;
	MAIL_FROM?: string;
};

export type ContactEmailInput = {
	name: string;
	email: string;
	message: string;
};

const readMailerEnv = (): MailerEnv => {
	if (typeof process === 'undefined') {
		throw new Error('Nodemailer must run in a server environment.');
	}

	return process.env as MailerEnv;
};

const transporter = (() => {
	const env = readMailerEnv();
	const host = env.SMTP_HOST;
	const port = Number(env.SMTP_PORT ?? 587);
	const user = env.SMTP_USER;
	const pass = env.SMTP_PASS;

	if (!host || !user || !pass) {
		throw new Error('Missing SMTP_HOST, SMTP_USER, or SMTP_PASS environment variables.');
	}

	return nodemailer.createTransport({
		host,
		port,
		secure: env.SMTP_SECURE === 'true' || port === 465,
		auth: {
			user,
			pass,
		},
	});
})();

export const sendContactEmail = async ({ name, email, message }: ContactEmailInput) => {
	const env = readMailerEnv();
	const to = env.MAIL_TO ?? env.SMTP_USER;
	const from = env.MAIL_FROM ?? env.SMTP_USER;

	if (!to || !from) {
		throw new Error('Missing MAIL_TO or MAIL_FROM environment variables.');
	}

	return transporter.sendMail({
		to,
		from,
		replyTo: email,
		subject: `Photography Inquiry from ${name}`,
		text: [`Name: ${name}`, `Email: ${email}`, '', message].join('\n'),
	});
};

export const verifyMailer = async () => transporter.verify();