import image from "../assets/background-soft-shapes.jpg";

export default function GlobalBackground() {
  return (
    <>
      {/* Imagen de fondo */}
      <div
        className="fixed inset-0 -z-50 pointer-events-none"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Capa gris semi-transparente */}
      <div
        className="fixed inset-0 -z-40 pointer-events-none"
        style={{
          background: "rgba(0, 0, 0, 0.35)", // ⬅️ gris con transparencia
          backdropFilter: "blur(20px)",       // ⬅️ opcional: efecto soft
        }}
      />
    </>
  );
}
