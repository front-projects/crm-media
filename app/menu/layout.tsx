import Navigation from '../components/navigation/Navigation';

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <div className="w-full mt-4 flex justify-center">{children}</div>
    </>
  );
}
