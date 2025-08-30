import * as React from "react"

import { Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Button } from "./button"
import { useTrigger } from "@/hooks/use-trigger"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

function TagsInput({ tags, onTagsChange, ...props }: React.ComponentProps<typeof Input> & {
  tags: string[]
  onTagsChange?: (tags: string[]) => void
}) {
  const [value, setValue] = React.useState("")
  const tagsRef = React.useRef(new Set(tags))
  const { trigger } = useTrigger()

  const handleAddTag = () => {
    if(value.length === 0) return;
    tagsRef.current.add(value)
    onTagsChange && onTagsChange(Array.from(tagsRef.current))
    setValue("")
  }

  React.useEffect(() => {
    tagsRef.current = new Set(tags)
    trigger()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue((e.target as HTMLInputElement).value)}
          {...props}
        />
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            handleAddTag()
          }}
        >
          <Plus />
        </Button>
      </div>
      <div className="wrap-break-word space-x-2">
        {Array.from(tagsRef.current).map((tag, i) => (
          <Badge
            variant="outline"
            className="bg-muted"
            key={i}
          >
            {tag}
            <Button
              variant="ghost"
              size="sm"
              className="w-4 h-3 p-0 cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                tagsRef.current.delete(tag)
                onTagsChange && onTagsChange(Array.from(tagsRef.current));
              }}>
              <X size={6}/>
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  )
}

export { Input, TagsInput }
