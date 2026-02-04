import React from 'react'

export default function Field({ label, hint, error, children, htmlFor, required }) {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined
  const hintId = htmlFor ? `${htmlFor}-hint` : undefined

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label 
          htmlFor={htmlFor} 
          className="font-orbitron text-xs tracking-wide text-white/80"
        >
          {label}
          {required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
        </label>
        {hint ? (
          <div id={hintId} className="font-rajdhani text-xs text-white/50">
            {hint}
          </div>
        ) : null}
      </div>
      <div className="mt-2">
        {React.cloneElement(children, {
          'aria-describedby': [errorId, hintId].filter(Boolean).join(' ') || undefined,
          'aria-invalid': error ? 'true' : 'false',
          'aria-required': required ? 'true' : undefined,
        })}
      </div>
      {error ? (
        <div id={errorId} role="alert" className="mt-1 font-rajdhani text-sm text-red-300">
          {error}
        </div>
      ) : null}
    </div>
  )
}
