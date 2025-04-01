# SkyLink AI

A modern airline management system with AI and blockchain integration.

## Features

- **Flight Management**: Real-time flight tracking, scheduling, and management
- **Dynamic Booking**: AI-powered booking system with dynamic pricing
- **VIP Platform**: Exclusive services for premium passengers
- **Baggage Tracking**: Real-time baggage tracking with blockchain integration
- **AI Training**: Pilot and crew training with AI and VR integration
- **Secure Authentication**: Multi-factor authentication and role-based access control
- **Real-time Notifications**: Push notifications for flight updates and important information
- **Theme Support**: Dark/light mode with system preference detection
- **PWA Support**: Installable as a Progressive Web App
- **Internationalization**: Multi-language support
- **Responsive Design**: Mobile-first approach with Material-UI

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Material-UI for components
- Firebase for backend services
- React Router for navigation
- Date-fns for date manipulation

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/skylink-ai.git
   cd skylink-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/      # React contexts for state management
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── services/      # API and service integrations
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── App.tsx        # Root component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
