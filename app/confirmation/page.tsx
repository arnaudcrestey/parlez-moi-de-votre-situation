export default function ConfirmationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <section className="w-full max-w-3xl rounded-[28px] border border-[rgba(90,60,40,0.08)] bg-[linear-gradient(180deg,rgba(255,250,244,0.96),rgba(255,246,238,0.78))] p-8 text-center shadow-soft sm:p-10 lg:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-[rgba(184,111,77,0.12)] text-3xl">
          ✅
        </div>

        <p className="mt-5 text-[10px] uppercase tracking-[0.16em] text-mirror-copper sm:text-xs sm:tracking-[0.18em]">
          Demande confirmée
        </p>

        <h1 className="mt-3 text-[2rem] font-semibold leading-tight text-mirror-ink sm:text-[2.4rem] lg:text-[2.8rem]">
          Votre demande a bien été enregistrée.
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-mirror-muted sm:text-base sm:leading-8">
        Vous recevrez prochainement un message du <span className="font-semibold text-mirror-terracotta">Cabinet Astrae</span>.
        </p>

        <p className="mt-4 text-sm leading-7 text-mirror-brown">
          Pensez à vérifier votre boîte e-mail (et vos spams).
        </p>
      </section>
    </main>
  );
}
