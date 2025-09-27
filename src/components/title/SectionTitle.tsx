import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionTitle = ({ children, className }: SectionTitleProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full my-6 sm:my-10 md:my-16",
        className
      )}
    >
      {/* 左の線 */}
      <div className="flex-1 h-px bg-bland opacity-30"></div>

      {/* タイトルテキスト */}
      <div className="px-6 md:px-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-bland whitespace-nowrap">
          {children}
        </h2>
      </div>

      {/* 右の線 */}
      <div className="flex-1 h-px bg-bland opacity-30"></div>
    </div>
  );
};
