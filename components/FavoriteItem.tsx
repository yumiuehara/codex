import { Favorite } from "@/helpers/types";
import Image from "next/image";

type Props = {
  favoriteData: Favorite;
};

export default function FavoriteItem({favoriteData}: Props) {
    return (
        <div className="flex flex-col justify-center items-center w-[100px]">
            <Image src={favoriteData.img} alt="" width={100} height={100} className="rounded-full mb-2" />
            <p className="text-sm">{favoriteData.name}</p>
            <p className="text-[10px] text-center text-gray-200">{favoriteData.source}</p>
        </div>
    )
}