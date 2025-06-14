import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  const t = useTranslations("components.Footer");

  return (
    <div className="bg-pink-600 flex items-center justify-center min-h-[30px] text-sm gap-4">
      <p>{t("text")}</p>
      <Link href={"https://github.com/yumiuehara/codex"} target="_blank">
        <FaGithub />
      </Link>
    </div>
  );
}
