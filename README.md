# ProfEndorse

A mobile application for managing academic reference requests between students and professors.

## Features

### For Students
- Request academic references from professors
- Track request status
- Upload supporting documents
- Make payments for reference letters

### For Professors
- Manage reference requests
- Create and use letter templates
- Track earnings
- Automated reference generation

### For Admins
- User verification
- System monitoring
- Payment management
- Support system

## Tech Stack

- React Native with Expo
- Supabase for backend
- TypeScript
- React Navigation

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file with:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the app:
```bash
npx expo start
```

## Development Status

Currently in active development. Basic features being implemented include:
- User authentication
- Professor dashboard
- Reference request management
- Template system 