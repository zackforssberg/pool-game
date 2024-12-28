import Link from "next/link";

export default function RulesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        How to Play <br /> Last Ball Standing
      </h1>
      <div className="rounded-md shadow-md p-6 max-w-3xl text-lg space-y-4">
        <p>
          Welcome to <span className="font-bold">Last Ball Standing</span>! This
          fun and engaging game is designed for 2 to 10 players. Each player
          will be assigned a set of random pool balls, and the objective is to
          eliminate all balls except your own while keeping your numbers hidden
          from other players.
        </p>

        <h2 className="text-2xl font-semibold">Game Setup</h2>
        <ol className="list-decimal pl-6">
          <li>
            At the start, select the number of players (2 to 10) using the{" "}
            <span className="font-bold">+</span> and{" "}
            <span className="font-bold">-</span> buttons on the home screen.
          </li>
          <li>
            Choose the number of balls each player will receive. Note that the
            game automatically disables invalid options based on the total
            number of balls available.
          </li>
          <li>
            Click the <span className="font-bold">Generate Numbers</span> button
            to shuffle and assign numbers to the players.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold">How to Play</h2>
        <ol className="list-decimal pl-6">
          <li>
            The first player clicks the{" "}
            <span className="font-bold">Show Numbers</span> button to reveal
            their assigned pool balls.
          </li>
          <li>
            After viewing their numbers, the player clicks{" "}
            <span className="font-bold">Next Player</span> to hide their numbers
            and pass the turn to the next player.
          </li>
          <li>
            Repeat this process until all players have seen their numbers.
          </li>
          <li>
            When the last player has viewed their numbers, the{" "}
            <span className="font-bold">Next Player</span> button will turn into
            a <span className="text-red-500 font-bold">Start Over</span> button.
            Clicking this will reset the game.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold">Objective</h2>
        <p>
          Each player&apos;s goal is to eliminate all pool balls except their
          own. Use strategy and skill to outlast your opponents and claim
          victory!
        </p>

        <p className="italic">Have fun and may the best player win!</p>
        <div className="flex items-center justify-center">
          <Link href="/">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
              Play the game!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
