"use client";

import { FormEvent, useId, useRef, useState } from "react";

export default function TrackingForm() {
  const codeId = useId();
  const passwordId = useId();
  const noticeTimer = useRef<number | null>(null);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ code?: string; password?: string }>({});
  const [notice, setNotice] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = {
      code: code.trim() ? undefined : "Ingresa el código de seguimiento.",
      password: password ? undefined : "Ingresa la contraseña.",
    };
    setErrors(nextErrors);

    if (nextErrors.code || nextErrors.password) return;

    setNotice(true);
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(false), 6000);
  }

  return (
    <>
      <form className="trackingForm" onSubmit={submit} noValidate>
        <label htmlFor={codeId}>Código de seguimiento</label>
        <input
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
      {notice && <div className="trackingToast" role="status">El seguimiento de pedidos estará disponible próximamente, cuando se habilite la extranet.</div>}
    </>
  );
}
