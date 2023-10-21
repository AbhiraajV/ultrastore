"use client";
import useStore from "@/hooks/useStore";
import {
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import { ProfileForm } from "../Form/Form";
type Props = {};
function FileInfoFormModal({}: Props) {
  const { isOpen, toggle } = useStore((state) => state);
  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            New File Upload
          </DialogTitle>
          <DialogDescription>
            Give your file metadata with a name and description.
            <br /> (You cannot change it later.)
          </DialogDescription>
        </DialogHeader>
        <div className="px-3 py-4">
          <ProfileForm close={toggle} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FileInfoFormModal;
