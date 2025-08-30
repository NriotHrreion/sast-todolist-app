"use client";

import type { Todo } from "@/lib/types";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { getAvailableTags, loadTodoList, saveTodoList, setTodoItemDone } from "@/lib/storage";
import { TodoContext } from "@/contexts/todo-context";
import { Badge } from "./ui/badge";
import { CheckCheck, Plus, Trash2, TriangleAlert } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { emitter } from "@/lib/emitter";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useTrigger } from "@/hooks/use-trigger";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

function TodoItem({
  title,
  description,
  tags,
  expiresAt,
  done,
  id
}: Todo & { id: string }) {
  const { currentItem, setCurrentItem } = useContext(TodoContext);
  const [checked, setChecked] = useState(done);
  const isCurrent = currentItem === id;
  const tagSet = useMemo(() => new Set(tags), [tags]);
  const isExpired = (
    typeof window === "undefined"
    ? false
    : (
      expiresAt && (new Date().getMilliseconds() > expiresAt.getMilliseconds())
    )
  );

  useEffect(() => {
    setChecked(done);
  }, [done]);
  
  return (
    <div
      id={id}
      className={cn("min-h-fit flex flex-col gap-1 border rounded-sm px-3 pt-2 pb-3 overflow-hidden cursor-pointer", isCurrent && "bg-muted")}
      onClick={() => setCurrentItem(id)}>
      <div className="flex items-center gap-2">
        <Checkbox
          checked={checked}
          onCheckedChange={(e) => {
            setChecked(e as boolean);
            setTodoItemDone(id, e as boolean);
          }}
          onClick={(e) => e.stopPropagation()}/>
        <h3 className="font-semibold wrap-anywhere">{title}</h3>
      </div>
      <span className="text-muted-foreground text-sm whitespace-nowrap overflow-hidden text-ellipsis">{description}</span>
      <div className="wrap-break-word space-x-2">
        {isExpired && (
          <Badge variant="destructive">
            <TriangleAlert />
            已超时
          </Badge>
        )}
        {Array.from(tagSet).map((tag, i) => (
          <Badge
            variant="outline"
            className="bg-muted"
            key={i}>
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function Sidebar() {
  const { currentItem, setCurrentItem } = useContext(TodoContext);
  const [displayedList, setDisplayedList] = useState<Map<string, Todo>>(new Map());
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const { trigger } = useTrigger();

  const handleSearchInput = () => {
    if(!searchRef.current) return;
    const search = searchRef.current.value.toLowerCase();

    const filteredMap = new Map();
    for(const [id, item] of loadTodoList()) {
      const includeText = (
        item.title.toLowerCase().includes(search)
        || (item.description && item.description.toLowerCase().includes(search))
      );
      if(
        (!selectedTag && includeText)
        || (selectedTag && item.tags.includes(selectedTag) && includeText)
      ) {
        filteredMap.set(id, item);
      }
    }
    setDisplayedList(filteredMap);
  };

  useEffect(() => {
    setDisplayedList(loadTodoList());
    emitter.on("todo-update", (newList) => {
      setDisplayedList(newList);
      trigger();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSearchInput();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTag]);

  return (
    <aside className="flex flex-col gap-2 w-[35%] p-2 border-r">
      <div className="flex gap-2">
        <Input
          placeholder="搜索任务..."
          onInput={() => handleSearchInput()}
          ref={searchRef}/>
        <Select onValueChange={(tag) => setSelectedTag(tag)}>
          <SelectTrigger className="cursor-pointer">
            <SelectValue placeholder="筛选标签"/>
          </SelectTrigger>
          <SelectContent>
            {Array.from(getAvailableTags()).map((tag, i) => (
              <SelectItem value={tag} key={i}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {Array.from(displayedList).map(([id ,item]) => <TodoItem {...item} id={id} key={id}/>)}
      </div>
      <div className="flex flex-col gap-2 [&_button]:cursor-pointer">
        <div className="w-full flex gap-2 [&>*]:flex-1">
          <Button
            variant="outline"
            onClick={() => displayedList.forEach((_item, id) => setTodoItemDone(id, true))}>
            <CheckCheck />
            全部完成
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              saveTodoList(new Map());
              setCurrentItem(null);
            }}>
            <Trash2 />
            清空任务
          </Button>
        </div>
        <Button
          disabled={!currentItem}
          onClick={() => setCurrentItem(null)}>
          <Plus />
          添加任务
        </Button>
      </div>
    </aside>
  );
}
