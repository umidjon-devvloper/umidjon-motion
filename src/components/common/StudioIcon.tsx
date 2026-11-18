export function StudioIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    user: <><circle cx="12" cy="7" r="3"/><path d="M5 21v-2a7 7 0 0 1 14 0v2Z"/></>,
    business: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12a22 22 0 0 0 18 0M12 11v4"/></>,
    video: <><rect x="3" y="6" width="12" height="12" rx="2"/><path d="m15 10 6-4v12l-6-4"/></>,
    budget: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v5c0 4 16 4 16 0V5M4 10v5c0 4 16 4 16 0v-5M4 15v4c0 4 16 4 16 0v-4"/></>,
    telegram: <path d="m3 10 18-7-5 18-5-7-8-4Zm8 4 10-11M11 14l-1 6 4-3"/>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/></>,
    pencil: <path d="m4 16-1 5 5-1L21 7l-4-4L4 16Zm10-10 4 4M4 16l4 4"/>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.video}</svg>;
}
