import PostInsta from "../components/ui/postInsta"

export default function Home() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-orange-600">Bienvenue dans mon app Next.js !</h1>

      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>Présentation du restaurant</li>
        <li>Spécialités</li>
        <li>Horaires</li>
        <li>Lieu</li>
      </ul>

      <PostInsta />
    </main>
  )
}
