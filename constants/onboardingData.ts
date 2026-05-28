// app/constants/onboardingData.ts (or similar path)

export interface OnboardingSlide {
  id: number;
  image: string; // Use 'any' or define a specific type for required images
  title: string;
  description: string;
  buttonText: string; // "Continue" or "Get Started"
}

// NOTE: You must update the paths to your actual image files in your assets folder.
export const slides: OnboardingSlide[] = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/dwcp6zcbi/image/upload/v1761051372/coins_kxnmtv.png',
    title: 'Gold – Invest & Own',
    description: 'Buy, sell, and store digital gold securely. Convert it into physical gold and get it delivered to your doorstep.',
    buttonText: 'Continue',
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/dwcp6zcbi/image/upload/v1761051372/wallet_with_cash_qwbanf.png',
    title: 'Stocks – Trade & Grow',
    description: 'Invest in top stocks with real-time market data. Track your F&O and trade seamlessly anytime.',
    buttonText: 'Continue',
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/dwcp6zcbi/image/upload/v1761051375/safe_box_baqgvo.png',
    title: 'Safety & Security',
    description: 'Advanced encryption and secure transactions keep your investments protected at all times.',
    buttonText: 'Get Started',
  },
];