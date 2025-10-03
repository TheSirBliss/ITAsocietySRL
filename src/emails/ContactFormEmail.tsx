// src/emails/ContactFormEmail.tsx
import { Html, Head, Preview, Body, Container, Heading, Text, Hr } from "@react-email/components";
import * as React from "react";

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({ name, email, message }) => (
  <Html>
    <Head />
    <Preview>New message from your ITAsociety website</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Contact Form Submission</Heading>
        <Text style={paragraph}>You received a new message from your website's contact form.</Text>
        <Hr style={hr} />
        <Text style={paragraph}><strong>From:</strong> {name}</Text>
        <Text style={paragraph}><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></Text>
        <Hr style={hr} />
        <Heading as="h2" style={subheading}>Message:</Heading>
        <Text style={paragraph}>{message}</Text>
      </Container>
    </Body>
  </Html>
);

// Stili
const main = { backgroundColor: "#f6f9fc", fontFamily: "Arial, sans-serif" };
const container = { margin: "0 auto", padding: "20px 0 48px", width: "580px" };
const heading = { fontSize: "24px", lineHeight: "1.3", fontWeight: "700", color: "#484848" };
const subheading = { fontSize: "18px", lineHeight: "1.3", fontWeight: "700", color: "#484848" };
const paragraph = { fontSize: "16px", lineHeight: "1.4", color: "#484848" };
const hr = { borderColor: "#cccccc", margin: "20px 0" };
