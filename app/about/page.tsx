import SignUpForm from "@/components/ui/sign-up-form";

export default async function About() {
  return (
    <div className="flex min-h-screen items-center justify-center align-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-row items-center justify-center align-center py-32 px-16">
        <SignUpForm />
      </main>
    </div>
  );
}
