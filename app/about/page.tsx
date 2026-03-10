import SignUpForm from "@/components/ui/sign-up-form";

export default async function About() {
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full flex-row items-center justify-center py-16 px-6 sm:px-16">
        <SignUpForm />
      </main>
    </div>
  );
}
