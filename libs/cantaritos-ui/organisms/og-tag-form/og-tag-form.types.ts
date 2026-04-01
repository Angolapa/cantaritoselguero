export interface TagFormValues {
  nameEs: string;
  nameEn: string;
}

export interface OgTagFormProps {
  defaultValues?: Partial<TagFormValues>;
  onSubmit: (values: TagFormValues) => void;
  isLoading?: boolean;
  isEdit?: boolean;
}
