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
    <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
      <Container style={{ margin: '0 auto', padding: '20px', width: '580px', border: '1px solid #eaeaea', borderRadius: '5px' }}>
        <Heading style={{ fontSize: '24px', color: '#333333' }}>New Contact Form Submission</Heading>
        <Text style={{ fontSize: '16px', color: '#555555' }}>You received a new message from your website's contact form.</Text>
        <Hr style={{ borderColor: '#eaeaea', margin: '20px 0' }} />
        <Text style={{ fontSize: '16px', color: '#555555' }}><strong>From:</strong> {name}</Text>
        <Text style={{ fontSize: '16px', color: '#555555' }}><strong>Email:</strong> <a href={`mailto:${email}`} style={{ color: '#007bff' }}>{email}</a></Text>
        <Hr style={{ borderColor: '#eaeaea', margin: '20px 0' }} />
        <Heading as="h2" style={{ fontSize: '20px', color: '#333333' }}>Message:</Heading>
        <Text style={{ fontSize: '16px', color: '#555555', whiteSpace: 'pre-wrap' }}>{message}</Text>
      </Container>
    </Body>
  </Html>
);
