export const metadata = {
  title: 'Expense Tracker',
  description: 'Minimalist expense tracking dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
