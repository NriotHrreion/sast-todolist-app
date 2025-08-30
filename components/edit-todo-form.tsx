"use client";

import type { Todo } from "@/lib/types";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input, TagsInput } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./ui/date-picker";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { addTodoItem, editTodoItem, removeTodoItem } from "@/lib/storage";
import { TodoContext } from "@/contexts/todo-context";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  tags: z.array(z.string()),
  expiresAt: z.date().optional()
});

export function EditTodoForm({
  title,
  description,
  tags,
  expiresAt,
  done
}: Todo) {
  const { currentItem, setCurrentItem } = useContext(TodoContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      description,
      tags,
      expiresAt
    }
  });
  const [hasDeadline, setHasDeadline] = useState(false);

  if(!currentItem) return <></>;

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    editTodoItem(currentItem, {
      ...values,
      done
    });
  };

  return (
    <div className="flex-1 px-5 py-4">
      <h2 className="text-lg font-semibold mb-2">编辑任务</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="请输入任务标题..." {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>描述</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="请输入任务描述..."
                    rows={5}
                    className="max-h-16 resize-none"
                    {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>标签</FormLabel>
                <FormControl>
                  <TagsInput tags={field.value} onTagsChange={field.onChange} placeholder="输入新标签名称..."/>
                </FormControl>
                <FormDescription className="text-xs">输入标签名称后按下回车以添加标签</FormDescription>
                <FormMessage />
              </FormItem>
            )}/>
          <FormField
            control={form.control}
            name="expiresAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>截至日期</FormLabel>
                <FormControl>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        defaultChecked={hasDeadline}
                        onCheckedChange={(checked) => {
                          field.onChange(!checked ? undefined : new Date());
                          setHasDeadline(checked as boolean);
                        }}/>
                      <Label className="font-normal">启用</Label>
                    </div>
                    <DatePicker
                      value={field.value}
                      disabled={!hasDeadline}
                      onSelect={field.onChange}/>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
          <div className="space-x-2">
            <Button className="cursor-pointer" type="submit">
              保存
            </Button>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                removeTodoItem(currentItem);
                setCurrentItem(null);
              }}>
              删除
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
