'use client';

import { CirclePlus, PenSquare } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { PasswordCategoryType } from '@/types';
import { GeneratePasswordField } from '@/components/GeneratePasswordField';
import { CategorySelect } from '@/components/CategorySelect';
import { useAddPassword } from '@/hooks/useAddPassword';
import { useEditPassword } from '@/hooks/useEditPassword';

type PasswordDialogProps =
    | { 
        mode: 'edit';
        uuid: string;
        websiteName: string;
        websiteUrl: string;
        usernameOrEmail: string;
        password: string;
        category: PasswordCategoryType;
    }
    | {
        mode: 'add';
    }

export function PasswordDialog(props: PasswordDialogProps) {
    const addPasswordHook = useAddPassword();
    const editPasswordHook = useEditPassword(props.mode === 'edit' ? props.uuid : '');

    // Getting correct state, formAction etc. based on the type of the component(edit, add)
    const { state, isDialogOpen, setIsDialogOpen, formAction, pending } =
        props.mode === 'edit' ? editPasswordHook : addPasswordHook;

    // Defining default values based on the type of the component
    const defaultValues =
        props.mode === 'edit'
            ? {
                websiteName: props.websiteName,
                websiteUrl: props.websiteUrl,
                usernameOrEmail: props.usernameOrEmail,
                password: props.password,
                category: props.category
            }
            : {
                websiteName: '',
                websiteUrl: '',
                usernameOrEmail: '',
                password: '',
                category: 'social' as PasswordCategoryType
            }

    // Adding correct text and icons based on the type of the component
    const title = props.mode === 'edit' ? 'Edit Password' : 'Add New Password';
    const submitText = props.mode === 'edit' ? 'Save Password' : 'Add Password';
    const triggerIcon = props.mode === 'edit' ? <PenSquare /> : <CirclePlus />;

    // No text for edit icon
    const triggerText = props.mode === 'edit' ? '': 'Add Password';

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setIsDialogOpen(true)} 
                    variant={props.mode === 'edit' ? 'ghost' : 'default'}
                    size={props.mode === 'edit' ? 'icon' : 'default'}
                    title={title}
                    aria-label={title}
                >
                    {triggerIcon}{triggerText}
                </Button>
            </DialogTrigger>

            <DialogContent>
                <form action={formAction} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {props.mode === 'edit'
                            ? 'Edit an existing password entry in your vault. All fields marked with * are required.'
                            : 'Add a new password entry to your vault. All fields marked with * are required.'
                            }
                        </DialogDescription>
                    </DialogHeader>

                    <Label htmlFor="website-name">Website Name *</Label>
                    <Input
                        type="text"
                        id="website-name"
                        name="websiteName"
                        defaultValue={defaultValues.websiteName}
                        placeholder='e.g, Google'
                        required
                    />

                    <Label htmlFor="website-url">Website URL *</Label>
                    <Input
                        type="text"
                        id="website-url"
                        name="websiteUrl"
                        defaultValue={defaultValues.websiteUrl}
                        placeholder='https://www.google.com'
                    />

                    <Label htmlFor="username-email">Username/Email</Label>
                    <Input
                        type="text"
                        id="username-email"
                        name="usernameOrEmail"
                        defaultValue={defaultValues.usernameOrEmail}
                        placeholder='your@email.com'
                    />

                    <GeneratePasswordField
                        defaultPassword={defaultValues.password}
                        ariaDescribedBy="password-error"
                    />
                    <div id="password-error" aria-live="polite" aria-atomic="true">
						{!state.success && state.formErrors?.password && (
  							<p className="text-sm text-red-500">
    								{state.formErrors.password[0]}
  							</p>
						)}
					</div> 

                   <CategorySelect
                        defaultCategory={defaultValues.category}
                        ariaDescribedBy="category-error"
                    />
					<div id="category-error" aria-live="polite" aria-atomic="true">
						{!state.success && state.formErrors?.category && (
  							<p className="text-sm text-red-500">
    								{state.formErrors.category[0]}
  							</p>
						)}
					</div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>

                        <Button
                            type="submit" 
                            variant="default"
                            disabled={pending}
                            aria-disabled={pending}
                        >
                            {submitText}
                        </Button>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}