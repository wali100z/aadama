import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';

const schema = yup.object({
  name: yup.string().required('Navn kræves'),
  email: yup.string().email('Ugyldig email').required('Email kræves'),
  message: yup.string().min(10, 'Mindst 10 tegn').required('Besked kræves'),
}).required();

const API_BASE =
  (typeof globalThis !== 'undefined' && globalThis?.process?.env?.REACT_APP_API_URL) ||
  (typeof globalThis !== 'undefined' && globalThis?.__env__?.VITE_API_URL) ||
  '';

export default function Kontakt() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  async function onSubmit(data) {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Fejl ved afsendelse');
      reset();
      Swal.fire({ title: 'Tak!', text: 'Din besked er sendt.', icon: 'success' });
    } catch (err) {
      Swal.fire({ title: 'Fejl', text: err?.message || 'Kunne ikke sende', icon: 'error' });
    }
  }

  return (
    <main className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <label>Navn<input {...register('name')} /></label>
        {errors.name && <small>{errors.name.message}</small>}

        <label>Email<input {...register('email')} /></label>
        {errors.email && <small>{errors.email.message}</small>}

        <label>Besked<textarea {...register('message')} /></label>
        {errors.message && <small>{errors.message.message}</small>}

        <button type="submit" disabled={isSubmitting}>Send</button>
      </form>
    </main>
  );
}