export default function ShineLine() {
  return (
    <div className="w-full h-[2px] relative overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, #000 0%, #1a0000 15%, #7f1d1d 30%, #dc2626 50%, #7f1d1d 70%, #1a0000 85%, #000 100%)",
          backgroundSize: "200% 100%",
          animation: "shineLine 2.8s linear infinite",
        }}
      />
    </div>
  );
}
