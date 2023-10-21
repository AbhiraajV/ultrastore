"use client";
import useStore from "@/hooks/useStore";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import axios from "axios";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {};

function DeleteFileFormModalDialogue({}: Props) {
  const router = useRouter();
  const {
    toggleDeleteFileModalOpen,
    isDeleteFileModalOpen,
    DeleteFileByUserId,
    DeleteFileForFileId,
  } = useStore((state) => state);
  const handleDelete = () => {
    axios
      .delete("/api/file", {
        data: {
          firestoreZipUrl: DeleteFileForFileId,
          fileId: DeleteFileByUserId,
        },
      })
      .then((response) => {
        console.log({ response });
        // router.push("/your-files")
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  return (
    <Dialog
      open={isDeleteFileModalOpen}
      onOpenChange={toggleDeleteFileModalOpen}
    >
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete File
          </DialogTitle>
          <DialogDescription className="w-full text-center">
            Ultrastore will stop tracking your file. <br />
            <span className="text-xs font-bold">
              {" "}
              it will be on youtube but there is no way to decode it ever!
              again!
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 flex gap-2 flex-row-reverse">
          <Button onClick={handleDelete}>Confirm</Button>
          <Button onClick={toggleDeleteFileModalOpen}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteFileFormModalDialogue;
