import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div className="w-full fixed top-0 p-3 flex items-center text-center bg-cyan-400 text-white font-bold z-10">
      <Link href="/">
        <span className="mx-4">메인</span>
      </Link>
      <Link href="/quiz">
        <span className="mx-4">퀴즈</span>
      </Link>
      <Link href="/http">
        <span className="mx-4">HTTP</span>
      </Link>
      <Link href="/recruit">
        <span className="mx-4">모집</span>
      </Link>
    </div>
  );
};

export default Header;
