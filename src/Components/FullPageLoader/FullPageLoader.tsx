import styles from "./FullPageLoader.module.css";

interface FullPageLoaderProps {
  /** Se false non mostra niente (comodo per usarlo con uno stato: show={loading}) */
  show?: boolean;
  /** Testo sotto l'animazione */
  message?: string;
}

/**
 * Loader a tutta pagina: copre lo schermo, blocca i clic
 * e mostra una penna che scrive mentre qualcosa sta caricando.
 */
export default function FullPageLoader({
  show = true,
  message = "Sto sfogliando le pagine",
}: FullPageLoaderProps) {
  if (!show) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <svg className={styles.drawing} viewBox="0 0 240 90" aria-hidden="true">
        {/* la riga scritta a mano */}
        <path
          className={styles.ink}
          d="M10 70 C 25 50, 35 50, 45 68 S 65 85, 75 62 S 95 45, 105 66 S 125 82, 140 60 S 160 48, 172 66 S 190 78, 205 62"
        />
        {/* la piuma */}
        <g className={styles.quill}>
          <path
            d="M8 70 L 40 18 C 48 6, 62 2, 70 4 C 68 14, 60 30, 46 40 Z"
            fill="#f4f4f5"
            stroke="#27272a"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 70 L 52 22"
            fill="none"
            stroke="#27272a"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <p className={styles.message}>
        {message}
        <span className={styles.dots} />
      </p>
    </div>
  );
}
