// Pure static CSS gradient background — zero JavaScript, zero RAF, zero re-renders
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Grid lines */}
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* Static gradient blobs — CSS only, no JS, no blur filter */}
      <div
        className="absolute"
        style={{
          top: '-10%', left: '-15%',
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(153,27,27,0.16) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '-8%', right: '-10%',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(154,52,18,0.13) 0%, transparent 65%)',
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,12,20,0.8) 100%)' }}
      />
    </div>
  );
}
