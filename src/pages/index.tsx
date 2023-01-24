export default function Home() {
  return (
    <div className="flex h-screen w-full justify-center place-items-center gap-6">
      <button
        className="flex items-center justify-center border round-full p-5 w-30 h-10 bg-white shadow-lg text-sm transition-all hover:bg-teal-500 duration-500"
        onClick={() => {
          alert("Hello");
        }}
      >
        Hello
      </button>
      <button
        className="flex items-center justify-center border round-full p-5 w-30 h-10 bg-white shadow-lg text-sm transition-all hover:bg-sky-500 duration-500"
        onClick={() => {
          alert("Hi");
        }}
      >
        Hi
      </button>
    </div>
  );
}
