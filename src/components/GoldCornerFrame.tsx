/**
 * Ornate gold corner brackets — couture frame ornament for hero photos,
 * editorial panels, and lightboxes. Sits flush against the parent.
 */
export default function GoldCornerFrame({
  inset = 18,
  size = 28,
  thickness = 1,
  color = 'rgba(216,190,126,0.7)',
}: {
  inset?: number;
  size?: number;
  thickness?: number;
  color?: string;
}) {
  const corners = [
    { top: inset, left: inset, borderRight: 0, borderBottom: 0 },
    { top: inset, right: inset, borderLeft: 0, borderBottom: 0 },
    { bottom: inset, left: inset, borderRight: 0, borderTop: 0 },
    { bottom: inset, right: inset, borderLeft: 0, borderTop: 0 },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <span
          key={i}
          className="absolute pointer-events-none"
          style={{
            width: size,
            height: size,
            border: `${thickness}px solid ${color}`,
            ...c,
          }}
        />
      ))}
    </>
  );
}
