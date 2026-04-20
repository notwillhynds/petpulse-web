import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:gap-14 lg:px-8 lg:py-16">
        <section className="border-border bg-card/60 grid gap-6 rounded-3xl border p-6 sm:p-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center lg:gap-8 lg:p-10">
          <div>
            <p className="text-primary mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
              About PetPulse
            </p>
            <h1 className="text-foreground max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              A proactive health companion for pets and the people who care for them.
            </h1>
            <p className="text-muted-foreground mt-4 max-w-3xl text-sm leading-7 sm:text-base">
              PetPulse is a concept website for a wearable pet harness system that helps make
              everyday health signals easier to understand. The goal is to turn daily behavior into
              useful insights so concerns can be noticed earlier and discussed with confidence.
            </p>
          </div>
          <div className="border-border/70 bg-background overflow-hidden rounded-2xl border">
            <Image
              src="/images/about1.png"
              alt="PetPulse smart harness being worn by a dog outdoors"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="border-border bg-card rounded-2xl border p-6 sm:p-8">
            <h2 className="text-foreground text-2xl font-semibold tracking-tight">
              Mission Statement
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-7 sm:text-base">
              PetPulse aims to support proactive pet healthcare by turning everyday activity data
              into clear and meaningful health insights. By combining wearable sensing with simple
              reporting, the platform helps pet owners and veterinarians identify potential concerns
              earlier and make better-informed decisions.
            </p>
          </article>

          <article className="border-border bg-card rounded-2xl border p-6 sm:p-8">
            <h2 className="text-foreground text-2xl font-semibold tracking-tight">
              Product Overview
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-7 sm:text-base">
              PetPulse is a smart harness concept designed to monitor core wellness indicators such
              as activity trends, rest quality, and possible stress changes. The platform is
              designed to support two primary audiences: pet owners seeking better awareness of
              their pet’s daily health, and veterinary professionals who benefit from structured
              behavioral context before clinical evaluations.
            </p>
            <ul className="text-muted-foreground mt-5 space-y-2 text-sm sm:text-base">
              <li>For pet owners: easier awareness, earlier warning signs, and peace of mind.</li>
              <li>For veterinarians: clearer history and better-informed conversations.</li>
            </ul>
          </article>
        </section>

        <section className="border-border bg-card/60 rounded-3xl border p-6 sm:p-8 lg:p-10">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Team
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm sm:text-base">
            PetPulse was developed as a collaborative academic project focused on exploring
            practical applications of wearable health monitoring technology for pets.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <article className="border-border bg-background rounded-2xl border p-5">
              <h3 className="text-foreground text-lg font-semibold">William Hynds</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                William contributed to the backend implementation and system configuration for the
                PetPulse website. His work focused on integrating Supabase for authentication and
                user management and configuring the database structure.
              </p>
            </article>

            <article className="border-border bg-background rounded-2xl border p-5">
              <h3 className="text-foreground text-lg font-semibold">Renad Nofal</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Renad contributed to the frontend implementation and overall interface design of the
                PetPulse website. Her work focused on building responsive user interface components
              </p>
            </article>
            </div>
        </section>
      </main>
    </div>
  );
}
