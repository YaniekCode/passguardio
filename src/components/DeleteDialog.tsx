'use client';

import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
} from '@/components/ui/dialog';

type DeleteDialogProps = {
    title: string;
    description: React.ReactNode;
    confirmText: string;
    triggerLabel: string;
    formAction: (formData: FormData) => void;
    pending: boolean;
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
};

export function DeleteDialog({
    title,
    description,
    confirmText,
    triggerLabel,
    formAction,
    pending,
    isDialogOpen,
    setIsDialogOpen
}: DeleteDialogProps) {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    title={triggerLabel}
                    variant="ghost"
                    size="icon"
                    aria-label={triggerLabel}
                    onClick={() => setIsDialogOpen(true)}
                >
                    <Trash />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <form action={formAction}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>

                        <Button
                            type="submit" 
                            variant="destructive"
                            disabled={pending}
                            aria-disabled={pending}
                        >
                            {confirmText}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}