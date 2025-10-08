import type { BoardDirectory, BoardItem } from "@prisma/client"
import BoardLink from "./BoardLink";
import { useContext } from "react";
import { GlobalContext } from "~/root";

type Props = {
  items: BoardItem[]
  subDirectories: BoardDirectory[]
  children?: React.ReactNode
}

export default function BoardContentList({ items, subDirectories, children }: Props) {
  const { lang: currentLang } = useContext(GlobalContext);

  // gather items and subDirs in one array
  // sort them and map to add type info
  const elements = subDirectories
    .map(subDir => ({ ...subDir, type: "subDir" }))
    .concat((items as any).map(item => ({ ...item, type: "item" })))
    .sort((a, b) => a.priority - b.priority);

  return (
    <ul className="my-6">
       {elements.map(item => (
          <BoardLink
            key={item.id}
            icon={item.icon}
            variant={item.type}
            id={item.id}
            name={item.name[currentLang]}
            url={item.link || "" as any}
            color = {item.color}
          />
        ))}
        {children}
    </ul>
  )

}