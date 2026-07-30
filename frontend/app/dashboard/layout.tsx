export default function WorkspaceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="shell page-shell">{children}</div>;
}
