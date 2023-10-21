"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import DisplayBlob from "../workspace/DisplayBlob";
import useStore from "@/hooks/useStore";
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(300, {
      message: "Description can't be longer than 300 characters.",
    }),
  file: z
    .instanceof(File)
    .refine((file) => file instanceof File, {
      message: "File must be a valid File object.",
    })
    .refine((file) => file !== null && file !== undefined, {
      message: "File must be present.",
    }),
});

const fileTypes = [
  "JPG",
  "PNG",
  "GIF",
  "PDF",
  "DOCX",
  "MP4",
  "MP3",
  "TXT",
  "ZIP",
  "CSV",
];
export function ProfileForm({ close }: { close?: () => void }) {
  const setProgressObject = useStore((state) => state.setProgressObject);
  const [fileDisplayBlob, setFileDisplayBlob] = useState<Blob | undefined>(
    undefined
  );
  const { setFileData, fileData } = useStore((state) => state);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...fileData,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setFileData({
      ...fileData,
      description: values.description,
      name: values.title,
      file: values.file,
      fileSize: values.file.size,
      fileType: values.file.type,
    });
    setProgressObject("File Received");
    if (close) close();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="title..."
                  {...field}
                  className="focus:outline-none focus:border-0"
                />
              </FormControl>
              <FormDescription>
                This will be shown on your youtube private videos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe this file [eg: resume-pdf, private-pics]"
                  className="resize-none focus:outline-none focus:border-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File to upload</FormLabel>
              <FormControl>
                <>
                  <FileUploader
                    handleChange={(file: any) => {
                      field.onChange(file);
                      setFileDisplayBlob(file);
                    }}
                    name="file"
                    types={fileTypes}
                  />
                  <DisplayBlob
                    decoded={false}
                    fileDisplayBlob={fileDisplayBlob}
                  />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
