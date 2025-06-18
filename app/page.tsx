import PostInsta from "../components/ui/postInsta"

export default function Home() {
  return (
    <main>
      <PostInsta/>
      <h1>Bienvenue dans mon app Next.js !</h1>
      <ul>
        <li>
          Présentation du restaurant
        </li>
        <li>
          Spécialités
        </li>
         <li>
          Horaires
        </li>
         <li>
          Lieu
        </li>
      </ul>
    </main>
  );
}
