import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

type Form = Pick<ReturnType<typeof useForm>, 'errors' | 'validate'>;
type Translations = ReturnType<typeof useTranslations>;

const useFormTranslationFix = (form: Form, t: Translations) => {
    const formRef = useRef(form);
    formRef.current = form;

    useEffect(() => {
        if (Object.values(formRef.current.errors).length > 0) {
            formRef.current.validate();
        }
    }, [t]);
};

export default useFormTranslationFix;
