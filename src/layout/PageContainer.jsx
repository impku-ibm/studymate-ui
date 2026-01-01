export default function PageContainer({ children }) {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] px-6 py-4 gap-4 bg-slate-50">
      {children}
    </div>
  );
}
