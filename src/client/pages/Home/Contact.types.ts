export type ContactData = {
    name?: string;
    email: string;
    subject: string;
    message: string;
};

export type ContactFormBaseProps = {
    isSubmitting?: boolean;
    onSubmit?: (values: ContactData) => void | Promise<void>;
};
