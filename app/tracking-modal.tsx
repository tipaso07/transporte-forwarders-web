"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";

type TrackingModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function TrackingModal({ open, onClose }: TrackingModalProps) {
  const titleId = useId();
  const codeId = useId();
  const passwordId = useId();
  const codeRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ code?: string; password?: string }>({});
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => codeRef.current?.focus(), 0);

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;

      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyboard);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyboard);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = {
      code: code.trim() ? undefined : "Ingresa el código de seguimiento.",
      password: password ? undefined : "Ingresa la contraseña.",
    };
    setErrors(nextErrors);

    if (nextErrors.code || nextErrors.password) return;

    setNotice(true);
    window.setTimeout(() => setNotice(false), 6000);
  }

  if (!open) return null;

  return (
    <div className="trackingOverlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section ref={modalRef} className="trackingModal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button className="trackingClose" type="button" onClick={onClose} aria-label="Cerrar seguimiento">×</button>
        <p className="tag">CONSULTA DE PEDIDOS</p>
        <h2 id={titleId}>Seguimiento de carga</h2>
        <p className="trackingIntro">Ingresa los datos asignados a tu pedido para consultar su estado.</p>

        <form className="trackingForm" onSubmit={submit} noValidate>
          <label htmlFor={codeId}>Código de seguimiento</label>
          <input
            ref={codeRef}
            id={codeId}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Ej. TF-000123"
            autoComplete="off"
            aria-invalid={Boolean(errors.code)}
            aria-describedby={errors.code ? `${codeId}-error` : undefined}
          />
          {errors.code && <small className="fieldError" id={`${codeId}-error`}>{errors.code}</small>}

          <label htmlFor={passwordId}>Contraseña</label>
          <div className="passwordField">
            <input
              id={passwordId}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? `${passwordId}-error` : undefined}
            />
            <button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {errors.password && <small className="fieldError" id={`${passwordId}-error`}>{errors.password}</small>}

          <button className="trackingSubmit" type="submit">Consultar pedido <span>→</span></button>
        </form>
        <p className="trackingSecurity">Tus datos no se almacenan ni se envían mientras esta función se encuentra en desarrollo.</p>
      </section>

      {notice && <div className="trackingToast" role="status">El seguimiento de pedidos estará disponible próximamente, cuando se habilite la extranet.</div>}
    </div>
  );
}
