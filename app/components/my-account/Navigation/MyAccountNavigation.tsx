import NavItemMyAcc from './NavItemMyAcc';

export default function MyAccountNavigation({
  ROLE,
}: {
  ROLE: string | undefined;
}) {
  return (
    <nav className="border-b-2 p-2 border-gray-600/40 text-xl font-bold text-center w-full flex items-center justify-start max-sm:mt-10 max-sm:text-[13px] max-sm:justify-center">
      <NavItemMyAcc href="/menu/my-account">MY ACCOUNT</NavItemMyAcc>
      {ROLE == 'OWNER' && (
        <NavItemMyAcc href="/menu/my-account/users">USERS</NavItemMyAcc>
      )}
      {ROLE == 'TEAM_LEAD' && (
        <NavItemMyAcc href="/menu/my-account/my-buyers">MY BUYERS</NavItemMyAcc>
      )}
      {ROLE !== 'Buyer' && (
        <NavItemMyAcc href="/menu/my-account/channels">CHANNELS</NavItemMyAcc>
      )}
    </nav>
  );
}
