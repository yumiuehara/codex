import FavoriteItem from "@/components/FavoriteItem";
import favoriteList from "@/data/favoriteList.json";
import { Favorite } from "@/helpers/types";

export default function FavoritePage() {
    const grouped = favoriteList.reduce<Record<string, Favorite[]>>((acc, item) => {
        const type = item.favoriteType;
        if (!acc[type]) acc[type] = [];
        acc[type].push(item);
        return acc;
    }, {});
    
    return <section className="mx-10 my-5">
        <p className="text-2xl font-bold text-center italic">~ favoritos ~</p>

        {Object.entries(grouped).map(([type, items]) => (
            <div key={type} className="mb-6">
                <p className="text-lg font-semibold mb-2">{type}</p>
                <div className="flex gap-5">
                    {items.map((item, index) => (
                        <FavoriteItem favoriteData={item} key={index} />
                    ))}
                </div>
            </div>
        ))}
    </section>
}