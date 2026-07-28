import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Footer() {

  return (
    <div className="bg-pink flex items-center justify-center min-h-[30px] text-sm gap-4">
      <Link href={"https://github.com/yumiuehara/codex"} target="_blank">
        <FaGithub />
      </Link>
    </div>
  );
}
