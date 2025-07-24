import { cn } from "../lib/utils";

const Loader = ({ text = "Loading...", className = "" }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        className
      )}
    >
      <div className="absolute inset-0 backdrop-blur-[2px] bg-background/20" />

      <div className="relative z-10 flex flex-col items-center justify-center p-6 rounded-lg border bg-card/95 shadow-lg">
        <div className="relative mb-6 w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent animate-pulse" />

          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-3">
              <div className="w-full h-full rounded-full border-4 border-primary/20 animate-spin">
                <div className="absolute top-0 left-1/2 w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full bg-primary animate-pulse" />
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <div className="absolute -rotate-12 w-12 h-16 bg-muted border rounded-sm shadow-sm opacity-60" />
                <div className="absolute rotate-6 w-12 h-16 bg-muted/80 border rounded-sm shadow-sm opacity-80 translate-x-1.5 translate-y-1.5" />

                <div className="relative w-12 h-16 bg-card border-2 border-primary/30 rounded-sm shadow-md flex flex-col p-1.5">
                  <div className="w-full h-1.5 bg-primary/60 rounded-sm mb-1" />

                  <div className="space-y-1 flex-1">
                    <div className="w-full h-0.5 bg-muted-foreground/40 rounded" />
                    <div className="w-3/4 h-0.5 bg-muted-foreground/40 rounded" />
                    <div className="w-full h-0.5 bg-muted-foreground/40 rounded" />
                    <div className="w-1/2 h-0.5 bg-muted-foreground/40 rounded" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-primary/90 flex items-center justify-center animate-pulse">
                      <div className="w-0 h-0 border-l-[6px] border-l-primary-foreground border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center space-x-1">
                <div
                  className="w-1 h-1 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "0s" }}
                />
                <div
                  className="w-1 h-1 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-1 h-1 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>

            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/60 animate-ping" />
            <div
              className="absolute bottom-5 left-3 w-1.5 h-1.5 rounded-full bg-secondary animate-ping"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-7 left-5 w-1 h-1 rounded-full bg-accent animate-ping"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-base font-semibold text-foreground">{text}</h3>

          <div className="w-36 h-0.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full animate-pulse transition-all duration-1000"
              style={{
                width: "65%",
                animation: "progress 2.5s ease-in-out infinite alternate",
              }}
            />
          </div>

          <div className="flex items-center justify-center space-x-1.5 text-xs text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>Processing</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 30%; }
          100% { width: 85%; }
        }
      `}</style>
    </div>
  );
};


export default Loader;
