export function LoadingSpinner({ fullScreen = false }: { fullScreen?: boolean }) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : 'min-h-[400px]'}`}>
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-border border-t-primary animate-spin" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-t-primary/50 animate-spin" style={{ animationDuration: '1.5s' }} />
      </div>
    </div>
  );
}
